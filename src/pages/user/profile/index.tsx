import { Form, message, Tabs } from "antd";
import PageTitle from "../../../components/PageTitle";
import PersonalInfo from "./PersonalInfo";
import Education from "./Education";
import Experience from "./Experience";
import { useNavigate } from "react-router-dom";
import { ProfileValues } from "../../../types/Profile";
import { getProfile, updateUserProfile } from "../../../api/userApi";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/alertSlice";
import { useEffect, useState } from "react";

const items = [
  {
    key: "1",
    label: "Personal Info",
    children: <PersonalInfo />,
  },
  {
    key: "2",
    label: "Education",
    children: <Education />,
  },
  {
    key: "3",
    label: "Experience",
    children: <Experience />,
  },
];

const initialFormValues: ProfileValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  portfolio: "",
  carrierObjective: "",
  address: "",
  education: [],
  skills: [],
  experinces: [],
  projects: [],
};

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<ProfileValues | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(showLoading());
        const user = JSON.parse(localStorage.getItem("user")!);
        const res = await getProfile(user.id);
        dispatch(hideLoading());
        if (res) {
          if (res.success) {
            setUserData((res.data as ProfileValues) ?? initialFormValues);
          } else {
            message.error(res.message);
          }
        }
      } catch (e) {
        if (e instanceof Error) {
          message.error(e.message);
        }
      }
    };
    getData();
  }, [dispatch]);

  const onFinish = async (values: ProfileValues) => {
    try {
      dispatch(showLoading());
      const res = await updateUserProfile(values);
      dispatch(hideLoading());
      if (res) {
        if (res.success) {
          message.success(res.message);
        } else {
          message.error(res.message);
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        dispatch(hideLoading());
        message.error(e.message);
      }
    }
  };

  return (
    <>
      <PageTitle title="PROFILE" />
      {userData && (
        <Form layout="vertical" onFinish={onFinish} initialValues={userData}>
          <Tabs defaultActiveKey="1" items={items}></Tabs>
          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="primary-outlined-btn"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
            <button type="submit" className="primary-contained-btn">
              Save
            </button>
          </div>
        </Form>
      )}
    </>
  );
};

export default Profile;
