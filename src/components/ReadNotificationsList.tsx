import { Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { Notification } from "../types/Notification";

interface Props {
  read: Notification[];
  changeStatus: (id: string, status: string) => void;
}

const ReadNotificationsList = ({ read, changeStatus }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      {read.map((notification, index) => (
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
                onClick={() => changeStatus(notification.id, "unread")}
              >
                Mark as unread
              </span>
            </div>
          }
        />
      ))}
    </>
  );
};

export default ReadNotificationsList;
