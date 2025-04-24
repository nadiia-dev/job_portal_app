import { Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../api/authApi";
import { User } from "../types/User";

const Register = () => {
  const navigate = useNavigate();
  const onFinish = async (values: User) => {
    try {
      const res = await registerApi(values);
      if (res) {
        if (res.success) {
          message.success(res.message);
          navigate("/login");
        } else {
          message.error(res.message);
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        message.error(e.message);
      }
    }
  };
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
            <input type="password" />
          </Form.Item>
          <button className="primary-contained-btn w-200 mt-2" type="submit">
            Register
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
