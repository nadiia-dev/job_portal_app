import { Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { Notification } from "../types/Notification";

interface Props {
  unread: Notification[];
  changeStatus: (id: string, status: string) => void;
}

const UnreadNotificationsList = ({ unread, changeStatus }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      {unread.map((notification, index) => (
        <Alert
          key={index}
          message={
            <div className="d-flex justify-content-between align-items-center">
              <div
                className="d-flex flex-column"
                onClick={() => navigate(notification.onClick)}
              >
                <span>{notification.title}</span>
                <span>{notification.createdAt}</span>
              </div>
              <span
                className="underline"
                onClick={() => changeStatus(notification.id, "read")}
              >
                Mark as read
              </span>
            </div>
          }
        />
      ))}
    </>
  );
};

export default UnreadNotificationsList;
