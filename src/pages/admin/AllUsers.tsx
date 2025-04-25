import PageTitle from "../../components/PageTitle";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import { message, Table } from "antd";
import { ProfileValues } from "../../types/Profile";
import { getAllUsers, updateUserStatus } from "../../api/userApi";

const AllUsers = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<ProfileValues[]>([]);

  const getDocs = useCallback(async () => {
    try {
      dispatch(showLoading());
      const res = await getAllUsers();
      if (res) {
        if (res.success) {
          setData(res.data!);
        }
      }
      dispatch(hideLoading());
    } catch (e) {
      if (e instanceof Error) {
        dispatch(hideLoading());
        message.error(e.message);
      }
    }
  }, [dispatch]);

  const changeStatus = async (id: string, status: string) => {
    try {
      dispatch(showLoading());
      const res = await updateUserStatus(id, status);
      if (res) {
        if (res.success) {
          getDocs();
        }
      }
      dispatch(hideLoading());
    } catch (e) {
      if (e instanceof Error) {
        dispatch(hideLoading());
        message.error(e.message);
      }
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "User Id",
      dataIndex: "id",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text: string, record: ProfileValues) => (
        <div className="d-flex gap-2 align-items-center">
          {record.status === "approved" && (
            <span
              className="underline"
              onClick={() => changeStatus(record.id, "rejected")}
            >
              Reject
            </span>
          )}

          {(record.status === "pending" || record.status === "rejected") && (
            <span
              className="underline"
              onClick={() => changeStatus(record.id, "approved")}
            >
              Approve
            </span>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    getDocs();
  }, [getDocs]);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <PageTitle title="All Users" />
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default AllUsers;
