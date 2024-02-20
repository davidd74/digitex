import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import useCookieVerification from "../hooks/useCookieVerification";

const PrivateRoutes = () => {
  const navigate = useNavigate();
  const { isAuthorized, isVerified } = useCookieVerification("private");
  const token = Cookies.get("token");
  const location = useLocation();

  useEffect(() => {
    if (isVerified && !isAuthorized && !token) {
      const currentPath = location.pathname;
      sessionStorage.setItem("from", currentPath);
      navigate("/login");
    }
  }, [isAuthorized, isVerified, navigate, location]);

  return <Outlet />;
};

export default PrivateRoutes;
