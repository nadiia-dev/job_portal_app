import { useNavigate } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";

const PostedJobs = () => {
  const navigate = useNavigate();
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
    </div>
  );
};

export default PostedJobs;
