import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../slices/userSlice";
import Grid from "@mui/material/Grid";
import Container from "../components/Container";
import InputField from "../components/InputField";
import { validateLoginForm } from "../utils/validate";
import { useFormValidation } from "../hooks/useFormValidation";
import { toast } from "react-hot-toast";
import { MdMail } from "react-icons/md";
import DIGITEX from "../assets/DIGITEX.svg";
import Button from "../components/Button";
import { useLoginMutation } from "../slices/userApiSlice";
import SyncLoader from "react-spinners/SyncLoader";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const from = sessionStorage.getItem("from") || "/";

  const { formData, handleInputChange, validateForm } = useFormValidation(
    {
      email: "",
      password: "",
    },
    () => validateLoginForm(formData.email, formData.password),
  );

  const handleSuccess = (msg) => toast.success(msg, {});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length !== 0) {
      Object.values(errors).forEach((error) => toast.error(error, {}));
      return;
    }

    try {
      const response = await login({ ...formData }).unwrap();
      console.log(response);
      const { success, message, user } = response;

      console.log(response);

      if (user) {
        const { firstName, lastName, email, orders, address } = user;
        const userData = {
          firstName,
          lastName,
          email,
          orders,
          shippingAddress: address,
        };
        dispatch(setUserData(userData));

        navigate(from || "/");
        sessionStorage.removeItem("from");
      }

      success ? handleSuccess(message) : toast.error(message, {});
    } catch (error) {
      toast.error("An error occurred. Please try again later.", {});
    }
  };
  return (
    <>
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <SyncLoader color="#58B1FF" />
        </div>
      ) : (
        <div className="relative flex h-screen w-full flex-col justify-center overflow-hidden bg-authimg bg-cover bg-center">
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
            <div className="flex h-full w-full flex-col justify-center xs:w-full lg:w-2/3 2xl:w-2/3">
              <h3 className="md:text-md text-sm font-medium tracking-widest text-neutral-300">
                GLAD TO SEE YOU AGAIN.
              </h3>
              <h1 className="pt-1 text-5xl font-semibold xl:text-6xl">
                Log in your account.
              </h1>
              <p className="py-7 text-sm text-neutral-300 md:text-base">
                Don&apos;t have an account? &nbsp;
                <Link
                  to="/signup"
                  className="font-medium text-primary-400 transition-colors duration-300 hover:text-primary-600"
                >
                  Register.
                </Link>
              </p>
              <form className="w-full md:w-3/4" onSubmit={handleSubmit}>
                <Grid container spacing={2.5}>
                  <Grid item xs={12}>
                    <InputField
                      label="Email"
                      type="email"
                      value={formData.email}
                      name="email"
                      onChange={handleInputChange}
                      autoComplete={"false"}
                      icon={
                        <MdMail
                          fontSize={"1.5rem"}
                          className="text-md text-white"
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputField
                      label="Password"
                      type="password"
                      name="password"
                      value={formData.password}
                      autoComplete={"false"}
                      onChange={handleInputChange}
                      id="filled-password-input"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <div className="pt-2 sm:w-2/3 xl:w-1/2">
                      <Button
                        text="Login"
                        type="submit"
                        className={"text-[1rem]"}
                      />
                    </div>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default LoginScreen;
