import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { logoutUser } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import menuItemStyle from "../utils/getDropDownMenuItemStyle";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const DropdownMenu = ({ anchorEl, open, onClose, isAuthorized }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutUser());
    Cookies.remove("token", { path: "/", domain: "localhost" });
    toast.success("Logged out");
    navigate("/signup");
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      disableScrollLock={true}
      sx={{
        "& .MuiMenu-paper": {
          backgroundColor: "#1E1E1E",
          color: "white",
          padding: "0.5rem 0",
          boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
          marginTop: "0.75rem",
        },
        "& .MuiMenuItem-root": {
          fontFamily: "Poppins",
        },
      }}
    >
      {isAuthorized === true ? (
        <div>
          <MenuItem
            component={Link}
            to={`/account/details`}
            onClick={onClose}
            sx={menuItemStyle}
          >
            Profile
          </MenuItem>

          <MenuItem sx={menuItemStyle}>
            <Link to={"/login"} onClick={logout}>
              Logout
            </Link>
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem component={Link} to="/login" onClick={onClose}>
            Log in
          </MenuItem>
          <MenuItem component={Link} to="/signup" onClick={onClose}>
            Sign up
          </MenuItem>
        </div>
      )}
    </Menu>
  );
};

DropdownMenu.propTypes = {
  anchorEl: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  open: PropTypes.bool,
  onClose: PropTypes.func,
  user: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isAuthorized: PropTypes.bool,
};

export default DropdownMenu;
