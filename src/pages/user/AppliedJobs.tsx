import { message, Table } from "antd";
import PageTitle from "../../components/PageTitle";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getApplicationsByUserId } from "../../api/jobsApi";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import { Application } from "../../types/Application";

const AppliedJobs = () => {
  const dispatch = useDispatch();
  const [jobsData, setJobsData] = useState<Application[]>([]);
  const user = JSON.parse(localStorage.getItem("user")!);

  useEffect(() => {
    const getDocs = async () => {
      try {
        dispatch(showLoading());
        const res = await getApplicationsByUserId(user.id);
        dispatch(hideLoading());
        if (res) {
          setJobsData(res.data!);
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

  const columns = [
    {
      title: "Job",
      dataIndex: "jobTitle",
    },
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Applied On",
      dataIndex: "appliedOn",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between">
        <PageTitle title="Applied Jobs" />
      </div>
      <Table columns={columns} dataSource={jobsData} />
    </div>
  );
};

export default AppliedJobs;
