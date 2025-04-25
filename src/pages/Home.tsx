import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DisplayJob } from "../types/DisplayJob";
import { hideLoading, showLoading } from "../redux/alertSlice";
import { getAllJobs } from "../api/jobsApi";
import { Col, message, Row } from "antd";
import PageTitle from "../components/PageTitle";

const Home = () => {
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

  useEffect(() => {
    getDocs();
  }, [getDocs]);

  return (
    <>
      <PageTitle title="Welcome to Job Portal!" />
      <Row gutter={[15, 15]} className="mt-3">
        {data.map((job) => (
          <Col span={8}>
            <div className="job-card">
              <h3 className="uppercase">{job.title}</h3>
              <div className="light-divider"></div>

              <div className="d-flex flex-column gap-1">
                <div className="d-flex justify-content-between mt-1">
                  <span>Company</span>
                  <span>{job.company}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Location</span>
                  <span>{job.location}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Salary</span>
                  <span>{job.salary}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Posted On</span>
                  <span>{job.postedOn}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Last Date To Apply</span>
                  <span>{job.lastDateToApply}</span>
                </div>
              </div>

              <button
                className="primary-outlined-btn w-100 mt-2"
                onClick={() => navigate(`/job-description/${job.id}`)}
              >
                Apply Now
              </button>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
