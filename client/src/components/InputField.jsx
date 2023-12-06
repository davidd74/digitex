import { TextField, IconButton } from "@mui/material";
import { getInputStyles } from "../utils/getInputStyles";
import PropTypes from "prop-types";
import { useState } from "react";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";

const InputField = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      id={props.id}
      label={props.label}
      name={props.name}
      type={props.type === "password" && showPassword ? "text" : props.type}
      autoComplete={props.autoComplete}
      variant="filled"
      value={props.value}
      onChange={props.onChange}
      error={props.error}
      sx={getInputStyles()}
      required={true}
      InputProps={{
        disableUnderline: true,
        endAdornment:
          props.type === "password" ? (
            <IconButton onClick={handleShowPassword}>
              {showPassword ? (
                <MdVisibility fontSize={"1.5rem"} color="white" />
              ) : (
                <MdVisibilityOff fontSize={"1.5rem"} color="white" />
              )}
            </IconButton>
          ) : (
            <IconButton>{props.icon}</IconButton>
          ),
      }}
      className="w-full"
    />
  );
};

InputField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.node,
  id: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  autoComplete: PropTypes.string,
  error: PropTypes.bool,
};

export default InputField;
