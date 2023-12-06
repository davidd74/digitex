import { Outlet, useNavigate } from "react-router-dom";
import useCookieVerification from "../hooks/useCookieVerification";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const CheckoutRoute = () => {
  const { isAuthorized, isVerified } = useCookieVerification("private");
  const cart = useSelector((state) => state.cart.cartItems);
  const step = useSelector((state) => state.checkout.step);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isVerified) {
      setIsLoading(false);
      if (!isAuthorized) {
        navigate("/login");
      }
    }

    if (cart.length === 0) {
      navigate("/cart");
    }

    if (step === window.location.pathname) {
      navigate(step);
    }
  }, [isAuthorized, isVerified, navigate, step, cart]);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading state while verifying
  }

  return <Outlet />;
};

export default CheckoutRoute;
