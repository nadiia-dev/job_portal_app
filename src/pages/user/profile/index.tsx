import { Form, message, Tabs } from "antd";
import PageTitle from "../../../components/PageTitle";
import PersonalInfo from "./PersonalInfo";
import Education from "./Education";
import Experience from "./Experience";
import { useNavigate, useParams } from "react-router-dom";
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
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  portfolio: "",
  carrierObjective: "",
  address: "",
  status: "",
  education: [],
  skills: [],
  experinces: [],
  projects: [],
};

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [userData, setUserData] = useState<ProfileValues | null>(null);
  const user = JSON.parse(localStorage.getItem("user")!);

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(showLoading());

        const res = await getProfile(params.id!);
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
  }, [dispatch, params.id]);

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
            {params.id === user.id && (
              <button type="submit" className="primary-contained-btn">
                Save
              </button>
            )}
          </div>
        </Form>
      )}
    </>
  );
};

export default Profile;
