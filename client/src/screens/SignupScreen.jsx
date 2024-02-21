import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../slices/userSlice";
import Grid from "@mui/material/Grid";
import { BiSolidContact } from "react-icons/bi";
import { MdMail } from "react-icons/md";
import Container from "../components/Container";
import InputField from "../components/InputField";
import DIGITEX from "../assets/DIGITEX.svg";
import toast from "react-hot-toast";
import { validateSignupForm } from "../utils/validate";
import { useFormValidation } from "../hooks/useFormValidation";
import Button from "../components/Button";
import { useSignUpMutation } from "../slices/userApiSlice";
import SyncLoader from "react-spinners/SyncLoader";

const SignupScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signup, { isLoading }] = useSignUpMutation();

  const { formData, formErrors, handleInputChange, validateForm } =
    useFormValidation(
      {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      },
      () => validateSignupForm(formData),
    );

  const handleError = (err) => toast.error(err);
  const handleSuccess = (msg) => toast.success(msg);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length !== 0) {
      Object.values(errors).forEach((error) => {
        if (typeof error === "string") {
          toast.error(error, {});
        } else {
          console.error("Error is not a string:", error);
        }
      });
      return;
    }

    try {
      const response = await signup({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      }).unwrap();

      const { success, message, user } = response;

      if (user) {
        const { _id, firstName, lastName, email } = user;
        console.log(user);
        const userData = {
          _id,
          firstName,
          lastName,
          email,
          orders: [],
        };
        dispatch(setUserData(userData));
      }

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="relative flex flex-col justify-center w-full h-screen overflow-hidden bg-center bg-cover bg-authimg">
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <SyncLoader color="#58B1FF" />
        </div>
      ) : (
        <>
          <Container>
            <Link to="/">
              <img
                src={DIGITEX}
                alt="Digitex logo"
                className="mt-6 w-[160px]"
              />
            </Link>
          </Container>
          <Container style={{ height: "100%" }}>
            <div className="flex flex-col justify-center w-full h-full xs:w-full lg:w-2/3 2xl:w-2/3">
              <h3 className="text-sm font-medium tracking-widest text-neutral-300 md:text-lg">
                START SHOPPING TODAY
              </h3>
              <h1 className="pt-1 text-4xl font-semibold md:text-6xl lg:text-5xl xl:text-6xl">
                Create a new account.
              </h1>
              <p className="text-sm py-7 text-neutral-300 md:text-base">
                Already have an account? &nbsp;
                <Link
                  to="/login"
                  className="font-medium transition-colors duration-300 text-primary-400 hover:text-primary-600"
                >
                  Log in.
                </Link>
              </p>
              <form className="w-full md:w-3/4" onSubmit={handleSubmit}>
                <Grid container spacing={2.5}>
                  <Grid item xs={12} sm={6}>
                    <InputField
                      label="First Name"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      error={!!formErrors.firstName}
                      autoComplete="given-name"
                      onChange={handleInputChange}
                      icon={<BiSolidContact className="text-white text-md" />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputField
                      label="Last Name"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      //  Updated to use formData
                      error={!!formErrors.lastName}
                      autoComplete="family-name"
                      onChange={handleInputChange}
                      icon={<BiSolidContact className="text-white text-md" />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputField
                      label="Password"
                      name="password"
                      type="password"
                      value={formData.password}
                      autoComplete="new-password"
                      onChange={handleInputChange}
                      id="filled-password-input"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputField
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      autoComplete="email"
                      error={!!formErrors.email}
                      icon={
                        <MdMail
                          fontSize={"1.5rem"}
                          className="text-white text-md"
                        />
                      }
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <div className="pt-2 sm:w-1/3 xl:w-1/2">
                      <Button
                        text="Create Account"
                        type="submit"
                        onClick={handleSubmit}
                        className={"text-[1rem]"}
                      />
                    </div>

                    {/* <button
                  className="transition-background w-full rounded-2xl bg-primary-600 px-2 py-5 text-sm font-medium duration-300 hover:bg-primary-700 ms:w-2/3 md:text-[1rem] lg:w-2/3 xl:w-1/2"
                  onClick={handleSubmit}
                >
                  Create account
                </button> */}
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        </>
      )}
    </div>
  );
};

export default SignupScreen;
