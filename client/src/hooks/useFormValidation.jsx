// useFormValidation.js
import { useState } from "react";

export const useFormValidation = (initialData, validationFunction) => {
  const [formData, setFormData] = useState(initialData);
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = validationFunction();
    setFormErrors(errors);
    return errors;
  };

  return {
    formData,
    formErrors,
    handleInputChange,
    validateForm,
  };
};
