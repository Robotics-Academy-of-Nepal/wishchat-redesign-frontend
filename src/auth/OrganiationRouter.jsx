import { Outlet, Navigate } from "react-router-dom";
const OrganiationRouter = () => {
  return localStorage.getItem("org_id") ? (
    <Outlet />
  ) : (
    <Navigate to="/createOrganization" />
  );
};

export default OrganiationRouter;
