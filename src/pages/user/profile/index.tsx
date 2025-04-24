import { Tabs } from "antd";
import PageTitle from "../../../components/PageTitle";
import PersonalInfo from "./PersonalInfo";
import Education from "./Education";
import Experience from "./Experience";

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

const Profile = () => {
  return (
    <>
      <PageTitle title="PROFILE" />
      <Tabs defaultActiveKey="1" items={items}></Tabs>
    </>
  );
};

export default Profile;
