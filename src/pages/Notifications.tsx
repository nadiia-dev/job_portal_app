import { Tabs } from "antd";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import UnreadNotificationsList from "../components/UnreadNotificationsList";
import ReadNotificationsList from "../components/ReadNotificationsList";
import { RootState } from "../redux/store";

const Notifications = () => {
  const { read, unread } = useSelector(
    (state: RootState) => state.notifications
  );
  const dipatch = useDispatch();

  const changeStatus = () => {};

  const items = [
    {
      key: "1",
      label: "Unread",
      children: (
        <UnreadNotificationsList unread={unread} changeStatus={changeStatus} />
      ),
    },
    {
      key: "2",
      label: "Read",
      children: (
        <ReadNotificationsList read={read} changeStatus={changeStatus} />
      ),
    },
  ];

  return (
    <div>
      <PageTitle title="Notifications" />
      <Tabs defaultActiveKey="1" items={items}></Tabs>
    </div>
  );
};

export default Notifications;
