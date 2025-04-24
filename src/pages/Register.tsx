import { Form } from "antd";
import { Link } from "react-router-dom";

const Register = () => {
  const onFinish = () => {};
  return (
    <div className="bg-primary h-screen d-flex justify-content-center align-items-center">
      <div className="w-[600px] bg-white p-4 ">
        <h4>JOB PORTAL - REGISTER</h4>
        <div className="divider"></div>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" label="Name">
            <input type="text" />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <input type="text" />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <input type="text" />
          </Form.Item>
          <button className="primary-contained-btn w-200 mt-2" type="submit">
            Login
          </button>
          <Link to="/login" className="d-block mt-2">
            Already a member? Click here to login
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;
