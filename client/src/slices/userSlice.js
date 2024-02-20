import { createSlice } from "@reduxjs/toolkit";

const getInitialUser = () => {
  const userData = localStorage.getItem("userData");
  return userData ? JSON.parse(userData) : [];
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: getInitialUser(),
  },
  reducers: {
    setUserData(state, action) {
      state.userData = action.payload;
      localStorage.setItem("userData", JSON.stringify(state.userData));
    },

    updateUserDetails(state, action) {
      state.userData.firstName = action.payload.firstName;
      state.userData.lastName = action.payload.lastName;
      state.userData.email = action.payload.email;
      // Update the local storage
      localStorage.setItem("userData", JSON.stringify(state.userData));
    },

    addShippingAddress(state, action) {
      state.userData.shippingAddress = action.payload;
      localStorage.setItem("userData", JSON.stringify(state.userData));
    },

    addOrderToUser(state, action) {
      // Ensure the orders array exists
      if (!state.userData.orders) {
        state.userData.orders = [];
      }

      // Add the new order ID
      state.userData.orders.push(action.payload);

      // Update the local storage
      localStorage.setItem("userData", JSON.stringify(state.userData));
    },

    logoutUser(state) {
      state.userData = {}; // Reset user data to an empty object
      localStorage.removeItem("userData"); // Clear data from local storage
    },
  },
});

export const {
  setUserData,
  addShippingAddress,
  logoutUser,
  updateUserDetails,
  addOrderToUser,
} = userSlice.actions;
export default userSlice.reducer;
