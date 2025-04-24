const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = JSON.parse(localStorage.getItem("user")!);
  if (user) {
    return children;
  } else {
    window.location.href = "/login";
  }
};

export default ProtectedRoute;
