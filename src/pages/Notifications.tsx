import { message, Tabs } from "antd";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import UnreadNotificationsList from "../components/UnreadNotificationsList";
import ReadNotificationsList from "../components/ReadNotificationsList";
import { RootState } from "../redux/store";
import { hideLoading, showLoading } from "../redux/alertSlice";
import { changeNotificationStatus } from "../api/userApi";
import { setReloadNotifications } from "../redux/notificationsSlice";

const Notifications = () => {
  const { read, unread } = useSelector(
    (state: RootState) => state.notifications
  );
  const dispatch = useDispatch();

  const changeStatus = async (id: string, status: string) => {
    try {
      dispatch(showLoading());
      const res = await changeNotificationStatus(id, status);
      if (res) {
        if (res.success) {
          dispatch(hideLoading());
          message.success(res.message);
          dispatch(setReloadNotifications(true));
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        dispatch(hideLoading());
        message.error(e.message);
      }
    }
  };

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
