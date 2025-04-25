import { message, Modal, Table } from "antd";
import { Application } from "../../../types/Application";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../../redux/alertSlice";
import { useDispatch } from "react-redux";
import { changeApplicationStatus } from "../../../api/applicationsApi";

interface Props {
  showAppliedCandidates: boolean;
  setShowAppliedCandidates: (val: boolean) => void;
  appiledCandidates: Application[];
  reloadData: (id: string) => void;
}

const AppliedCandidates = ({
  showAppliedCandidates,
  setShowAppliedCandidates,
  appiledCandidates,
  reloadData,
}: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeStatus = async (applicationData: Application, status: string) => {
    try {
      dispatch(showLoading());
      const response = await changeApplicationStatus({
        ...applicationData,
        status,
      });
      dispatch(hideLoading());
      if (response) {
        if (response.success) {
          message.success(response.message);
          reloadData(applicationData.jobId);
        } else {
          message.error(response.message);
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        message.error("Something went wrong");
        dispatch(hideLoading());
      }
    }
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "userName",
      render: (text: string, record: Application) => {
        return (
          <span
            className="underline"
            onClick={() => navigate(`/profile/${record.userId}`)}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_text: string, record: Application) => {
        return (
          <div>
            {record.status === "pending" && (
              <>
                <span
                  className="underline"
                  onClick={() => changeStatus(record, "approved")}
                >
                  Approve
                </span>
                <span
                  className="underline mx-2"
                  onClick={() => changeStatus(record, "rejected")}
                >
                  Reject
                </span>
              </>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Modal
        title="Applied Candidates"
        open={showAppliedCandidates}
        onCancel={() => setShowAppliedCandidates(false)}
        footer={null}
        width={1000}
      >
        <Table columns={columns} dataSource={appiledCandidates} rowKey="id" />
      </Modal>
    </>
  );
};

export default AppliedCandidates;
