import InputField from "../components/InputField";

import { useFormValidation } from "../hooks/useFormValidation";
import { validateUpdateUserDetails } from "../utils/validate";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../slices/userSlice";
import { useUpdateUserDetailsMutation } from "../slices/userApiSlice";
import SyncLoader from "react-spinners/SyncLoader";

const AccountDetails = () => {
  const email = useSelector((state) => state.user.userData.email);

  const user = useSelector((state) => state.user?.userData);
  const dispatch = useDispatch();

  const [updateUserDetailsApi, { isLoading }] = useUpdateUserDetailsMutation();

  const { formData, handleInputChange, validateForm, formErrors } =
    useFormValidation(
      {
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        password: "",
        confirmPassword: "",
      },
      () => validateUpdateUserDetails(formData),
    );

  const updateUser = async (e) => {
    e.preventDefault();
    const erorrs = validateForm();

    if (Object.keys(erorrs).length !== 0) {
      Object.values(erorrs).forEach((error) => {
        toast.error(error, {});
      });
      return;
    }

    try {
      const response = await updateUserDetailsApi({
        currentEmail: email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      }).unwrap();

      if (response.success === "true") {
        dispatch(
          updateUserDetails({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
          }),
        );
      }

      formData.password = "";
      formData.confirmPassword = "";

      if (response.status === 200) {
        toast.success("Details updated", {});
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occured, please try again", {});
    }
  };

  return (
    <>
      {isLoading ? (
        <SyncLoader color="#58B1FF" />
      ) : (
        <div>
          <form className="flex flex-col gap-4" onSubmit={updateUser}>
            <InputField
              label="First name"
              type="text"
              name="firstName"
              autoComplete="given-name"
              onChange={handleInputChange}
              value={formData.firstName}
              error={!!formErrors.firstName}
            />
            <InputField
              label="Last name"
              type="text"
              name="lastName"
              autoComplete="family-name"
              onChange={handleInputChange}
              value={formData.lastName}
              error={!!formErrors.lastName}
            />
            <InputField
              label="Email address"
              type="email"
              name="email"
              autoComplete="email"
              onChange={handleInputChange}
              value={formData.email}
              error={formErrors.email}
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleInputChange}
              error={!!formErrors.password}
            />
            <InputField
              label="Confirm password"
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={!!formErrors.confirmPassword}
            />
            <button
              className="text-medium w-full rounded-2xl bg-primary-600 p-1 py-3 transition-all duration-200
        ease-linear hover:bg-primary-700 md:w-1/3 xl:w-1/4
        "
            >
              Update
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AccountDetails;
