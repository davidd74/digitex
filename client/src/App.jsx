import { Route, Routes, useLocation } from "react-router-dom";
import {
  HomeScreen,
  ProductScreen,
  CartScreen,
  UserProfileScreen,
  LoginScreen,
  SignupScreen,
  AddressScreen,
  PaymentScreen,
  OrderSuccessfulScreen,
  ReviewScreen,
} from "./screens";

import Navbar from "./components/Navbar";
import CheckoutRoute from "./routes/CheckoutRoute";
import OrderRoutes from "./routes/OrderRoutes";
import PrivateRoutes from "./routes/PrivateRoute";

const App = () => {
  const location = useLocation();
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/cart" element={<CartScreen />} />

        <Route path="/*" element={<PrivateRoutes />}>
          <Route path="product/:id/review" element={<ReviewScreen />} />
          <Route path="account/*" element={<UserProfileScreen />} />
        </Route>

        <Route path="/checkout/*" element={<CheckoutRoute />}>
          <Route path="address" element={<AddressScreen />} />
          <Route path="payment" element={<PaymentScreen />} />
        </Route>

        <Route path="/*" element={<OrderRoutes />}>
          <Route
            path="checkout/successful/:id"
            element={<OrderSuccessfulScreen />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
