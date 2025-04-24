import DefaultLayout from "./DeafultLayout";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = JSON.parse(localStorage.getItem("user")!);
  if (user) {
    return <DefaultLayout>{children}</DefaultLayout>;
  } else {
    window.location.href = "/login";
    return null;
  }
};

export default ProtectedRoute;
