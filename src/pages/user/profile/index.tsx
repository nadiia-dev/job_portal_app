import { Tabs } from "antd";
import PageTitle from "../../../components/PageTitle";
import TabPane from "antd/es/tabs/TabPane";
import PersonalInfo from "./PersonalInfo";
import Education from "./Education";
import Experience from "./Experience";

const Profile = () => {
  return (
    <>
      <PageTitle title="PROFILE" />
      <Tabs defaultActiveKey="1">
        <TabPane tab="Personal Info" key="1">
          <PersonalInfo />
        </TabPane>
        <TabPane tab="Education" key="2">
          <Education />
        </TabPane>
        <TabPane tab="Experience" key="3">
          <Experience />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Profile;
