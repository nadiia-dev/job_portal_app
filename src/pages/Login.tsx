import { Form, message } from "antd";
import { Link } from "react-router-dom";
import { loginApi } from "../api/authApi";
import { User } from "../types/User";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";

const Login = () => {
  const dispatch = useDispatch();

  const onFinish = async (inputs: User) => {
    try {
      dispatch(showLoading());
      const res = await loginApi(inputs);
      dispatch(hideLoading());
      if (res) {
        message.success(res.message);
        localStorage.setItem("user", JSON.stringify(res.data));
        window.location.href = "/";
      }
    } catch (e) {
      dispatch(hideLoading());
      if (e instanceof Error) {
        message.error(e.message);
      }
    }
  };

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
            <input type="password" />
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
