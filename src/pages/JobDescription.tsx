import { useEffect, useState } from "react";
import { DisplayJob } from "../types/DisplayJob";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";
import { getJobById } from "../api/jobsApi";
import { Col, message, Row } from "antd";
import PageTitle from "../components/PageTitle";

const initialFormValues: DisplayJob = {
  id: "",
  title: "",
  industry: "",
  location: "",
  company: "",
  salary: "",
  jobType: "",
  lastDateToApply: "",
  experience: "",
  noticePeriod: "",
  jobDescription: "",
  status: "",
  postedByUserId: "",
  postedByUserName: "",
  postedOn: "",
};

const JobDescription = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [jobData, setJobData] = useState<DisplayJob | null>(null);

  useEffect(() => {
    const getDoc = async () => {
      try {
        dispatch(showLoading());
        const res = await getJobById(params.id!);
        dispatch(hideLoading());
        if (res) {
          if (res.success) {
            setJobData((res.data as DisplayJob) ?? initialFormValues);
          } else {
            message.error(res.message);
          }
          dispatch(hideLoading());
        }
      } catch (e) {
        if (e instanceof Error) {
          dispatch(hideLoading());
          message.error(e.message);
        }
      }
    };
    if (params.id) {
      getDoc();
    } else {
      setJobData(initialFormValues);
    }
  }, [dispatch, params.id]);
  return (
    <>
      {jobData && (
        <>
          <PageTitle title={jobData.title} />
          <Row>
            <Col span={18}>
              <div className="d-flex flex-column gap-1">
                <div className="d-flex justify-content-between mt-1">
                  <span>Company</span>
                  <span>{jobData.company}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Location</span>
                  <span>{jobData.location?.toUpperCase()}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Salary</span>
                  <span>{jobData.salary}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Experience</span>
                  <span>{jobData.experience} Years</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Notice Period</span>
                  <span>{jobData.noticePeriod} Days</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Job Type</span>
                  <span>{jobData.jobType}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Industry</span>
                  <span>{jobData.industry?.toUpperCase()}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Posted On</span>
                  <span>{jobData.postedOn}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Last Date To Apply</span>
                  <span>{jobData.lastDateToApply}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Posted By</span>
                  <span>{jobData.postedByUserName}</span>
                </div>

                <h5 className="underline uppercase my-3">Job Description</h5>
                <span className="pt-2">{jobData.jobDescription}</span>

                <div className="d-flex gap-2 mt-3 justify-content-end">
                  <button
                    className="primary-outlined-btn"
                    onClick={() => navigate("/")}
                  >
                    CANCEL
                  </button>

                  <button className="primary-contained-btn">APPLY NOW</button>
                </div>
              </div>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default JobDescription;
