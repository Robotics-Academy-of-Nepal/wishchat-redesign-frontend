import { Outlet, Navigate } from "react-router-dom";

const PrivateRouter = () => {
  return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;
