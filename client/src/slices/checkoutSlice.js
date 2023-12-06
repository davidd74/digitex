import { createSlice } from "@reduxjs/toolkit";

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    step: null,
  },
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
  },
});

export const { setStep } = checkoutSlice.actions;

export default checkoutSlice.reducer;
