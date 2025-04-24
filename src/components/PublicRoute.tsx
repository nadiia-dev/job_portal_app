import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const user = JSON.parse(localStorage.getItem("user")!);
  if (user) {
    return <Navigate to="/dashboard" />;
  } else {
    return children;
  }
};

export default PublicRoute;
