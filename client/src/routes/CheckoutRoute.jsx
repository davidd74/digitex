import { Outlet, useNavigate } from "react-router-dom";
import useCookieVerification from "../hooks/useCookieVerification";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import Cookies from "js-cookie";

const CheckoutRoute = () => {
  const { isAuthorized, isVerified } = useCookieVerification("private");
  const cart = useSelector((state) => state.cart.cartItems);
  const token = Cookies.get("token");
  const step = useSelector((state) => state.checkout.step);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isVerified) {
      setIsLoading(false);
      if (!isAuthorized && !token) {
        const currentPath = window.location.pathname;
        sessionStorage.setItem("from", currentPath);
        navigate("/login");
      }
    }

    if (cart.length === 0) {
      navigate("/cart");
    }

    if (step === window.location.pathname) {
      navigate(step);
    }
  }, [isAuthorized, isVerified, step, cart]);

  if (isLoading) {
    return (
      <div>
        <SyncLoader color="#58B1FF" />
      </div>
    );
  }

  return <Outlet />;
};

export default CheckoutRoute;
