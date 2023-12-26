// React hooks
import { Link, useNavigate } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { setUserData } from "../slices/userSlice";

// Material UI
import Grid from "@mui/material/Grid";

// Components
import Container from "../components/Container";
import InputField from "../components/InputField";

// Utilities
import { validateLoginForm } from "../utils/validate";
import { useFormValidation } from "../hooks/useFormValidation";

// Other
import axios from "axios";
import { toast } from "react-hot-toast";
import { MdMail } from "react-icons/md";
import logo from "../assets/logo.svg";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      const { data } = await axios.post(
        "http://localhost:5000/login",
        { ...formData },
        { withCredentials: true },
      );

      const { success, message, user } = data;

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
    <div className="relative flex h-screen w-full flex-col justify-center overflow-hidden bg-authimg bg-cover bg-center">
      <Container>
        <Link to="/">
          <img src={logo} alt="logo" className="w-30 mt-6 md:w-40" />
        </Link>
      </Container>
      <Container style={{ height: "100%" }}>
        <div className="flex h-full w-full flex-col justify-center xs:w-full lg:w-2/3 2xl:w-2/3">
          <h3 className="md:text-md text-sm font-medium tracking-widest text-neutral-300">
            GLAD TO SEE YOU AGAIN.
          </h3>
          <h1 className="pt-1 text-4xl font-semibold md:text-6xl lg:text-5xl xl:text-6xl">
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
                  autoComplete={false}
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
                  autoComplete={false}
                  onChange={handleInputChange}
                  id="filled-password-input"
                />
              </Grid>
              <Grid item xs={6}>
                <button
                  className="transition-background w-full rounded-2xl bg-primary-600 py-4 text-sm font-medium duration-300 hover:bg-primary-700 ms:w-2/3 md:text-[1rem] xl:w-1/2"
                  type="submit"
                >
                  Log in
                </button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default LoginScreen;
