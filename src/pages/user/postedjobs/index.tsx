import { useNavigate } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import { useEffect, useState } from "react";
import { getJobsByUser } from "../../../api/jobsApi";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/alertSlice";
import { message, Table } from "antd";
import { DisplayJob } from "../../../types/DisplayJob";

const PostedJobs = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")!);
  const dispatch = useDispatch();
  const [data, setData] = useState<DisplayJob[]>([]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Posted On",
      dataIndex: "postedOn",
    },
    {
      title: "Last Date to Apply",
      dataIndex: "lastDateToApply",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text: string, record: DisplayJob) => (
        <div className="d-flex gap-3 align-items-center">
          <span className="underline">candidates</span>
          <i className="ri-delete-bin-line"></i>
          <i
            className="ri-pencil-line"
            onClick={() => navigate(`/posted-jobs/edit/${record.id}`)}
          ></i>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const getDocs = async () => {
      try {
        dispatch(showLoading());
        const res = await getJobsByUser(user.id);
        console.log(res);
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
    };
    getDocs();
  }, [dispatch, user.id]);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <PageTitle title="Posted Jobs" />
        <button
          className="primary-outlined-btn"
          onClick={() => navigate("/posted-jobs/new")}
        >
          New Job
        </button>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default PostedJobs;
