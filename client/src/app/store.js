import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import cartReducer from "../slices/cartSlice";
import checkoutReducer from "../slices/checkoutSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
  },
});
