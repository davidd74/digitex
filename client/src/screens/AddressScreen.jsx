import Container from "../components/Container";
import InputField from "../components/InputField";
import { Grid } from "@mui/material";
import {
  FaHouseChimney,
  FaLocationDot,
  FaMagnifyingGlassLocation,
} from "react-icons/fa6";
import { FaGlobeAsia } from "react-icons/fa";

import { BiSolidKey, BiSolidPhoneCall } from "react-icons/bi";
import { validateAddressForm } from "../utils/validate";
import { toast } from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addShippingAddress } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { setStep } from "../slices/checkoutSlice";
import { useFormValidation } from "../hooks/useFormValidation";

const AddressScreen = () => {
  const navigate = useNavigate();

  const userAddress = useSelector(
    (state) => state.user.userData.shippingAddress,
  );

  const { formData, formErrors, handleInputChange, validateForm } =
    useFormValidation(
      {
        streetAddress: userAddress?.streetAddress || "",
        city: userAddress?.city || "",
        state: userAddress?.state || "",
        country: userAddress?.country || "",
        zip: userAddress?.zip || "",
        phoneNumber: userAddress?.phoneNumber || "",
      },
      () => validateAddressForm(formData),
    );

  const dispatch = useDispatch();

  const email = useSelector((state) => state.user.userData.email);

  const handleSetAddress = async (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length !== 0) {
      // Display validation errors with toast or handle them as needed
      Object.values(errors).forEach((error) => {
        toast.error(error, {});
      });
      return;
    } else {
      try {
        await axios.post(`${BASE_URL}/user/address`, {
          email,
          ...formData,
        });
        dispatch(setStep("/checkout/payment"));
        dispatch(addShippingAddress(formData));
        toast.success("Address saved!");
        navigate("/checkout/payment");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <h1 className="mt-[200px] pb-8 text-3xl leading-snug lg:text-4xl">
        Shipping address
      </h1>
      <form className="w-full lg:w-2/3 xl:w-1/2" onSubmit={handleSetAddress}>
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <InputField
              label="Street address"
              type="text"
              name="streetAddress"
              autoComplete="street-address"
              value={formData.streetAddress}
              error={formErrors.streetAddress}
              onChange={handleInputChange}
              icon={
                <FaLocationDot
                  className="text-md text-white"
                  style={{ fontSize: "1.25rem" }}
                />
              }
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <InputField
              label="City"
              type="text"
              name="city"
              value={formData.city}
              error={formErrors.city}
              autoComplete="address-level2"
              onChange={handleInputChange}
              icon={
                <FaHouseChimney
                  className="text-md text-white"
                  style={{ fontSize: "1.25rem" }}
                />
              }
            />
          </Grid>

          <Grid item xs={12}>
            <InputField
              label="Country"
              type="text"
              name="country"
              value={formData.country}
              error={formErrors.country}
              autoComplete="address-level1"
              onChange={handleInputChange}
              icon={
                <FaGlobeAsia
                  className="text-md text-white"
                  style={{ fontSize: "1.25rem" }}
                />
              }
            />
          </Grid>

          <Grid item xs={12} md={12} lg={4}>
            <InputField
              label="State/Province"
              type="text"
              name="state"
              value={formData.state}
              error={formErrors.state}
              autoComplete="address-level1"
              onChange={handleInputChange}
              icon={
                <FaMagnifyingGlassLocation
                  className="text-md text-white"
                  style={{ fontSize: "1.25rem" }}
                />
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <InputField
              label="Zip/Postal code"
              type="number"
              name="zip"
              autoComplete="postal-code"
              value={formData.zip}
              error={formErrors.zip}
              onChange={handleInputChange}
              icon={<BiSolidKey className="text-white" />}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <InputField
              label="Phone number"
              type="number"
              name="phoneNumber"
              value={formData.phoneNumber}
              error={formErrors.phoneNumber}
              autoComplete="tel"
              onChange={handleInputChange}
              icon={
                <BiSolidPhoneCall
                  className="text-white"
                  style={{ fontSize: "1.35rem" }}
                />
              }
            />
          </Grid>
        </Grid>
        <button
          type="submit"
          className="mt-6 rounded-xl bg-primary-600 py-4 text-sm font-medium duration-300 hover:bg-primary-700 xs:w-1/2 ms:w-1/3 md:w-1/4"
        >
          Save Address
        </button>
      </form>
    </Container>
  );
};

export default AddressScreen;
