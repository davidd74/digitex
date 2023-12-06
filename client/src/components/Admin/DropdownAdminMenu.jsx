import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import menuItemStyle from "../../utils/getDropDownMenuItemStytyle";

const DropdownAdminMenu = ({ anchorEl, open, onClose, isAuthorized }) => {
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
            to={`/admin/products`}
            onClick={onClose}
            sx={menuItemStyle}
          >
            Products
          </MenuItem>
          <MenuItem
            component={Link}
            to={`/admin/orders`}
            onClick={onClose}
            sx={menuItemStyle}
          >
            Orders
          </MenuItem>
          <MenuItem
            component={Link}
            to={`/admin/users`}
            onClick={onClose}
            sx={menuItemStyle}
          >
            Users
          </MenuItem>
        </div>
      ) : null}
    </Menu>
  );
};

DropdownAdminMenu.propTypes = {
  anchorEl: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  open: PropTypes.bool,
  onClose: PropTypes.func,
  user: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isAuthorized: PropTypes.bool,
};

export default DropdownAdminMenu;
