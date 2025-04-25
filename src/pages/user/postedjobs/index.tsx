import { useNavigate } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import { useCallback, useEffect, useState } from "react";
import {
  deleteJob,
  getApplicationsByJobId,
  getJobsByUser,
} from "../../../api/jobsApi";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/alertSlice";
import { message, Table } from "antd";
import { DisplayJob } from "../../../types/DisplayJob";
import { Application } from "../../../types/Application";
import AppliedCandidates from "./AppliedCandidates";

const PostedJobs = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")!);
  const dispatch = useDispatch();
  const [data, setData] = useState<DisplayJob[]>([]);
  const [candidates, setCandidates] = useState<Application[]>([]);
  const [showAppliedCandidates, setShowAppliedCandidates] = useState(false);

  const getDocs = useCallback(async () => {
    try {
      dispatch(showLoading());
      const res = await getJobsByUser(user.id);
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
  }, [dispatch, user.id]);

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

  const getAppliedCandidates = async (id: string) => {
    try {
      dispatch(showLoading());
      const res = await getApplicationsByJobId(id);
      if (res) {
        if (res.success) {
          setCandidates(res.data!);
          if (!showAppliedCandidates) {
            setShowAppliedCandidates(true);
          }
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
      render: (text: string, record: DisplayJob) => (
        <div className="d-flex gap-3 align-items-center">
          <span
            className="underline"
            onClick={() => getAppliedCandidates(record.id)}
          >
            candidates
          </span>
          <i
            className="ri-delete-bin-line"
            onClick={() => handleDelete(record.id)}
          ></i>
          <i
            className="ri-pencil-line"
            onClick={() => navigate(`/posted-jobs/edit/${record.id}`)}
          ></i>
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
        <PageTitle title="Posted Jobs" />
        <button
          className="primary-outlined-btn"
          onClick={() => navigate("/posted-jobs/new")}
        >
          New Job
        </button>
      </div>
      <Table columns={columns} dataSource={data} />

      {showAppliedCandidates && (
        <AppliedCandidates
          showAppliedCandidates={showAppliedCandidates}
          setShowAppliedCandidates={setShowAppliedCandidates}
          appiledCandidates={candidates}
          reloadData={getAppliedCandidates}
        />
      )}
    </div>
  );
};

export default PostedJobs;
