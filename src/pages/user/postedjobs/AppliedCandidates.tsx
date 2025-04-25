import { Modal, Table } from "antd";
import { Application } from "../../../types/Application";
import { useNavigate } from "react-router-dom";

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
  const columns = [
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
