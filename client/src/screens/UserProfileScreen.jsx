import { Grid } from "@mui/material";
import Container from "../components/Container";
import AccountNavigation from "../components/AccountNavigation";
import Orders from "../components/Orders";
import AccountDetails from "../components/AccountDetails";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import OrderScreen from "./OrderScreen";
import OrderRoutes from "../routes/OrderRoutes";

const UserProfileScreen = () => {
  const user = useSelector((state) => state.user.userData);

  return (
    <Container>
      <Grid container spacing={2} mt={"200px"} gap={"2.5rem"}>
        <Grid item xs={12} md={4}>
          <div className="mb-4 text-sm">
            <p>{user.firstName + " " + user.lastName}</p>
            <p className="mt-2">{user.email}</p>
          </div>
          <AccountNavigation />
        </Grid>

        <Grid item xs={12} md={7}>
          <Routes>
            <Route path="orders" element={<Orders />} />

            <Route path="orders/:id" element={<OrderRoutes />}>
              <Route path="" element={<OrderScreen />} />
            </Route>

            <Route path="details" element={<AccountDetails />} />
          </Routes>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfileScreen;
