import PropTypes from "prop-types";

const Button = ({ text, onClick, disabled, className, type }) => {
  return (
    <button
      type={type ? type : "text"}
      onClick={onClick || null}
      disabled={disabled || false}
      className={`${
        !className ? "" : className
      } hover:bg-primary-500 w-full rounded-xl bg-primary-600 py-3.5 font-medium transition-all duration-300 ease-in-out hover:bg-primary-700 ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string,
};

export default Button;
