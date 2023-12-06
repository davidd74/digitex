import PropTypes from "prop-types";

const Container = (props) => {
  return (
    <div
      className={`xs:max-w-screen 2xl:max-w-screen-3xl xl:max-w-screen-3xl container mx-auto xs:p-4 ms:p-5 md:max-w-screen-xl lg:max-w-screen-2xl`}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default Container;
