import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const QuantityInput = ({ initialValue = 1, countInStock, onValueChange }) => {
  const [value, setValue] = useState(initialValue);

  const handleDecrement = () => {
    if (value > 1) {
      const newValue = value - 1;
      setValue(newValue);
      onValueChange(newValue);
    }
  };

  const handleIncrement = () => {
    if (value < countInStock) {
      const newValue = value + 1;
      setValue(newValue);
      onValueChange(newValue);
    }
  };

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value);
    if (newValue >= 1 && newValue <= countInStock) {
      setValue(newValue);
      onValueChange(newValue);
    }
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div className="flex gap-2 font-semibold">
      <button
        onClick={handleDecrement}
        className="h-8 w-8 rounded-md bg-secondary-400 shadow-sm sm:h-10 sm:w-10"
      >
        -
      </button>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        className="h-8 w-12 rounded-md bg-secondary-400 text-center sm:h-10 sm:w-14"
      />
      <button
        onClick={handleIncrement}
        className="h-8 w-8 rounded-md bg-secondary-400 sm:h-10 sm:w-10"
      >
        +
      </button>
    </div>
  );
};

QuantityInput.propTypes = {
  initialValue: PropTypes.number,
  countInStock: PropTypes.number,
  onValueChange: PropTypes.func,
};

export default QuantityInput;
