import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useCookieVerification from "../hooks/useCookieVerification";

const AdminRoutes = () => {
  const navigate = useNavigate();
  const { isAuthorized, isAdmin } = useCookieVerification("private");
  const location = useLocation();

  useEffect(() => {
    if (isAuthorized && !isAdmin) {
      const currentPath = location.pathname;
      sessionStorage.setItem("from", currentPath);
      navigate("/");
    }
  }, [isAuthorized, isAdmin, navigate, location]);
  return <Outlet />;
};

export default AdminRoutes;
