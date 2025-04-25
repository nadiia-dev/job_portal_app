import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { useCallback, useEffect, useState } from "react";
import { deleteJob, getAllJobs, updateJob } from "../../api/jobsApi";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import { message, Table } from "antd";
import { DisplayJob } from "../../types/DisplayJob";

const AllJobs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState<DisplayJob[]>([]);

  const getDocs = useCallback(async () => {
    try {
      dispatch(showLoading());
      const res = await getAllJobs();
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

  const handleDelete = async (id: string) => {
    try {
      dispatch(showLoading());
      const res = await deleteJob(id);
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

  const changeStatus = async (jobData: DisplayJob, status: string) => {
    try {
      dispatch(showLoading());
      const res = await updateJob({ ...jobData, status });
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
      render: (_text: string, record: DisplayJob) => (
        <div className="d-flex gap-3 align-items-center">
          <span className="underline">candidates</span>
          <i
            className="ri-delete-bin-line"
            onClick={() => handleDelete(record.id)}
          ></i>
          {record.status === "approved" && (
            <span
              className="underline"
              onClick={() => changeStatus(record, "rejected")}
            >
              Reject
            </span>
          )}

          {(record.status === "pending" || record.status === "rejected") && (
            <span
              className="underline"
              onClick={() => changeStatus(record, "approved")}
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
        <PageTitle title="All Jobs" />
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

export default AllJobs;
