import { Form } from "antd";
import { Link } from "react-router-dom";

const Login = () => {
  const onFinish = () => {};
  return (
    <div className="bg-primary h-screen d-flex justify-content-center align-items-center">
      <div className="w-[600px] bg-white p-4 ">
        <h4>JOB PORTAL - LOGIN</h4>
        <div className="divider"></div>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" label="Email">
            <input type="text" />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <input type="text" />
          </Form.Item>
          <button className="primary-contained-btn w-200 mt-2" type="submit">
            Login
          </button>
          <Link to="/register" className="d-block mt-2">
            Not a member? Click here to register
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
