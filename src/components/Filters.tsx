import { useDispatch } from "react-redux";
import { DisplayJob } from "../types/DisplayJob";
import { hideLoading, showLoading } from "../redux/alertSlice";
import { getAllJobs } from "../api/jobsApi";
import { message } from "antd";
import { FiltersType } from "../types/Filters";

interface Props {
  filters: FiltersType;
  setFilters: (filters: FiltersType) => void;
  setData: (jobs: DisplayJob[]) => void;
}

const Filters = ({ filters, setFilters, setData }: Props) => {
  const dispatch = useDispatch();
  const filterJobs = async (filtersVal: FiltersType) => {
    try {
      dispatch(showLoading());
      const res = await getAllJobs(filtersVal);
      if (res) {
        if (res.success) {
          const approvedJobs = res.data!.filter(
            (job) => job.status === "approved"
          );
          setData(approvedJobs);
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

  return (
    <div>
      <div className="d-flex justify-content-start gap-2">
        <select
          name=""
          id=""
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        >
          <option value="">Location</option>
          <option value="ukraine">Ukraine</option>
          <option value="usa">USA</option>
          <option value="uk">UK</option>
        </select>
        <select
          name=""
          id=""
          value={filters.industry}
          onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
        >
          <option value="">Industry</option>
          <option value="it">IT</option>
          <option value="finance">Finance</option>
          <option value="marketing">Marketing</option>
          <option value="realestate">Real Estate</option>
        </select>

        <select
          name=""
          id=""
          value={filters.experience}
          onChange={(e) =>
            setFilters({ ...filters, experience: e.target.value })
          }
        >
          <option value="">Experience</option>
          <option value="0">Fresher</option>
          <option value="1">1 Year</option>
          <option value="2">2 Years</option>
          <option value="3">3+ Years</option>
        </select>
        <button
          className="primary-outlined-btn"
          onClick={() => {
            filterJobs({
              location: "",
              industry: "",
              experience: "",
            });
            setFilters({
              location: "",
              industry: "",
              experience: "",
            });
          }}
        >
          CLEAR
        </button>
        <button
          className="primary-contained-btn"
          onClick={() => filterJobs(filters)}
        >
          FILTER
        </button>
      </div>
    </div>
  );
};

export default Filters;
