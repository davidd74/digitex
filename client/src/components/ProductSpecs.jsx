import PropTypes from "prop-types";
import battery from "../assets/battery.svg";
import storage from "../assets/storage.svg";
import pixels from "../assets/pixels.svg";
import screen from "../assets/screen.svg";

const ProductSpecs = ({ product }) => {
  const specs = [
    {
      name: "Screen Size",
      value: product.screenSize,
      units: "in",
      icon: screen,
    },
    {
      name: "Storage",
      value: product.storage,
      units: "GB",
      icon: storage,
    },
    {
      name: "Camera Pixels",
      value: product.cameraPixels,
      units: "pixels",
      icon: pixels,
    },
    {
      name: "Battery",
      value: product.batteryMah,
      units: "mAh",
      icon: battery,
    },
  ];

  return (
    <ul className="flex xs:mt-8 xs:gap-3 md:mt-6 md:gap-2 lg:mt-12 xl:gap-4">
      {specs.map((spec) => (
        <li
          key={spec.name}
          className="flex w-1/5 flex-col items-center justify-center rounded-xl bg-secondary-500 shadow-sm xs:p-2 md:p-3 lg:p-2 2xl:p-3"
        >
          <img
            src={spec.icon}
            alt={`${spec.name} icon`}
            className="xs:w-8 md:w-10 lg:w-14"
          />
          <p className="mt-3 text-center font-medium md:text-sm lg:text-lg">
            {spec.value} {spec.units}
          </p>
        </li>
      ))}
    </ul>
  );
};

ProductSpecs.propTypes = {
  product: PropTypes.shape({
    screenSize: PropTypes.number,
    storage: PropTypes.number,
    cameraPixels: PropTypes.number,
    batteryMah: PropTypes.number,
  }),
};

export default ProductSpecs;
