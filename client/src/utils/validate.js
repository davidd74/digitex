// Function to validate if a string matches a given pattern
export const isValidString = (value, pattern, errorMessage) => {
  if (!value || !pattern.test(value)) {
    return errorMessage;
  }
  return null;
};

export const isValidLength = (value, length, errorMessage) => {
  if (!value || value.length > length) {
    return errorMessage;
  }
  return null;
};

export const isValidRating = (value, errorMessage) => {
  if (!value || value < 1 || value > 5) {
    return errorMessage;
  }
  return null;
};

export const validateLoginForm = (email, password) => {
  const errors = {};

  const emailError = isValidString(
    email,
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "Invalid email format",
  );

  if (emailError) {
    errors.email = emailError;
  }

  return errors;
};

export const validateSignupForm = (formData) => {
  const errors = {};

  const firstNameError = isValidString(
    formData.firstName,
    /^[a-zA-Z\s]*$/,
    "First name cannot contain numbers or special characters",
  );

  if (firstNameError) {
    errors.firstName = firstNameError;
  }

  const lastNameError = isValidString(
    formData.lastName,
    /^[a-zA-Z\s]*$/,
    "Last name cannot contain numbers or special characters",
  );

  if (lastNameError) {
    errors.lastName = lastNameError;
  }

  const emailError = isValidString(
    formData.email,
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "Invalid email format",
  );

  if (emailError) {
    errors.email = emailError;
  }

  return errors;
};

export const validateAddressForm = (formData) => {
  const errors = {};

  const streetAddressError = isValidString(
    formData.streetAddress,
    /^[a-zA-Z0-9\s-.,]*$/,
    "Street address can contain only letters, numbers, hyphens, and periods",
  );

  if (streetAddressError) {
    errors.streetAddress = streetAddressError;
  }

  const cityError = isValidString(
    formData.city,
    /^[a-zA-Z\s-]*$/,
    "City can contain only letters and hyphens",
  );

  if (cityError) {
    errors.city = cityError;
  }

  const stateError = isValidString(
    formData.state,
    /^[a-zA-Z\s-]*$/,
    "State can contain only letters and hyphens",
  );

  if (stateError) {
    errors.state = stateError;
  }

  const countryError = isValidString(
    formData.country,
    /^[a-zA-Z ]*$/,
    "Country can contain only letters",
  );

  if (countryError) {
    errors.country = countryError;
  }

  const zipError = isValidString(
    formData.zip,
    /^[0-9]*$/,
    "Zip code can contain only numbers",
  );

  if (zipError) {
    errors.zip = zipError;
  }

  const phoneNumberError = isValidString(
    formData.phoneNumber,
    /^[0-9]*$/,
    "Phone number can contain only numbers",
  );

  if (phoneNumberError) {
    errors.phoneNumber = phoneNumberError;
  }

  return errors;
};

export const validateReviewForm = (formData) => {
  const errors = {};

  console.log(formData.reviewTitle);
  console.log(formData.reviewDescription);

  const reviewTitleError = isValidString(
    formData.reviewTitle,
    /^[a-zA-Z0-9\s.,!?]*$/, // Allow numbers and interpunctuation characters
    "Review title cannot contain special characters",
  );

  const reviewTitleLengthError = isValidLength(
    formData.reviewTitle,
    50, // Maximum length for review title
    "Review title must be less than 50 characters",
  );

  if (reviewTitleError) {
    errors.reviewTitle = reviewTitleError;
  } else if (reviewTitleLengthError) {
    errors.reviewTitle = reviewTitleLengthError;
  }

  const reviewDescriptionError = isValidString(
    formData.reviewDescription,
    /^[a-zA-Z0-9\s.,!?'"]*$/,
    "Review description cannot contain special characters",
  );

  const reviewDescriptionLengthError = isValidLength(
    formData.reviewDescription,
    200, // Maximum length for review description
    "Review description must be less than 200 characters",
  );

  const ratingError = isValidRating(
    formData.rating,
    "Rating must be between 1 and 5",
  );
  if (ratingError) {
    errors.rating = ratingError;
  }

  if (reviewDescriptionError) {
    errors.reviewDescription = reviewDescriptionError;
  } else if (reviewDescriptionLengthError) {
    errors.reviewDescription = reviewDescriptionLengthError;
  }

  return errors;
};

export const validateUpdateUserDetails = (formData) => {
  const errors = {};

  // Validate first name and last name (only strings with no spaces)
  const nameError = isValidString(
    formData.firstName,
    /^[a-zA-Z]*$/,
    "First name cannot contain numbers, special characters or spaces",
  );

  if (nameError) {
    errors.firstName = nameError;
  }

  const lastNameError = isValidString(
    formData.lastName,
    /^[a-zA-Z]*$/,
    "Last name cannot contain numbers, special characters or spaces",
  );

  if (lastNameError) {
    errors.lastName = lastNameError;
  }

  // Validate email format
  const emailError = isValidString(
    formData.email,
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "Invalid email format",
  );

  if (emailError) {
    errors.email = emailError;
  }

  // Validate password length
  const passwordLengthError = isValidLength(
    formData.password,
    6,
    "Password should not be shorter than 6 characters",
  );

  if (passwordLengthError) {
    errors.password = passwordLengthError;
    errors.confirmPassword = passwordLengthError;
  }

  // Validate if password and confirmPassword are the same
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

export const validateProductForm = (formData) => {
  const errors = {};

  const productNameError = isValidString(
    formData.productName,
    /^[a-zA-Z0-9\s-]*$/,
    "Product name cannot contain special characters",
  );

  if (productNameError) {
    errors.productName = productNameError;
  }

  const productDescriptionError = isValidString(
    formData.productDescription,
    /^[a-zA-Z0-9\s.,!?]*$/,
    "Product description cannot contain special characters",
  );

  if (productDescriptionError) {
    errors.productDescription = productDescriptionError;
  }

  const countInStockError = isValidString(
    formData.countInStock,
    /^[0-9]*$/,
    "Count in stock can contain only numbers",
  );

  if (countInStockError) {
    errors.countInStock = countInStockError;
  }

  const productPriceError = isValidString(
    formData.productPrice,
    /^[0-9]*$/,
    "Product price can contain only numbers",
  );

  if (productPriceError) {
    errors.productPrice = productPriceError;
  }

  const productImageError = isValidString(
    formData.productImage,
    /^(https?:\/\/)?([\da-zA-Z.-]+)\.([a-zA-Z.]{2,6})([/\w.-]*)*\/?$/,
    "Invalid image URL",
  );

  if (productImageError) {
    errors.productImage = productImageError;
  }

  const screenSizeError = isValidString(
    formData.screenSize,
    /^[0-9]*$/,
    "Screen size can contain only numbers",
  );

  if (screenSizeError) {
    errors.screenSize = screenSizeError;
  }

  const storageSizeError = isValidString(
    formData.storageSize,
    /^[0-9]*$/,
    "Storage can contain only numbers",
  );

  if (storageSizeError) {
    errors.storageSize = storageSizeError;
  }

  const cameraPixelsError = isValidString(
    formData.cameraPixels,
    /^[0-9]*$/,
    "Camera pixels can contain only numbers",
  );

  if (cameraPixelsError) {
    errors.cameraPixels = cameraPixelsError;
  }

  const batteryMahError = isValidString(
    formData.batteryMah,
    /^[0-9]*$/,
    "Battery mAh can contain only numbers",
  );

  if (batteryMahError) {
    errors.batteryMah = batteryMahError;
  }

  return errors;
};
