import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { logoutUser } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

const AccountNavigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "text-primary-400" : "text-white";
  };

  const logout = () => {
    dispatch(logoutUser());
    Cookies.remove("token", { path: "/", domain: "localhost" });
    toast.success("Logged out");
    navigate("/signup");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className={`bg-secondary-500 p-4 ${isActive("/account/details")}`}>
        <Link to="/account/details">Account details</Link>
      </div>
      <div className={`p-4 ${isActive("/account/orders")}`}>
        <Link to="/account/orders">My orders</Link>
      </div>
      <div className="bg-secondary-500 p-4">
        <button onClick={logout}>Log out</button>
      </div>
    </div>
  );
};

export default AccountNavigation;
