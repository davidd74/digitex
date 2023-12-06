import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import useCookieVerification from "../hooks/useCookieVerification";
import axios from "axios";
import toast from "react-hot-toast";

const OrderRoutes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthorized } = useCookieVerification("private");

  useEffect(() => {
    if (isAuthorized === false) {
      return navigate("/login");
    }

    axios
      .post(
        "http://localhost:5000/orderauth",
        { id },
        { withCredentials: true },
      )
      .then((response) => {
        if (response.data.status === false) {
          toast.error("You do not have permission to access this order.");
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error making the POST request:", error);
      });
  }, [isAuthorized, id, navigate]);

  return <Outlet />;
};

export default OrderRoutes;
