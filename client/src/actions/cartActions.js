// cartActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { updateCountInStock, updateQuantity } from "../slices/cartSlice";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-hot-toast";

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (_, { getState, dispatch }) => {
    const cart = getState().cart.cartItems;
    for (const item of cart) {
      const response = await axios.get(`${BASE_URL}/products/${item._id}`);
      const product = response.data;
      dispatch(
        updateCountInStock({
          id: item._id,
          countInStock: product.countInStock,
        }),
      );
      if (item.qty > product.countInStock) {
        dispatch(updateQuantity({ _id: item._id, qty: product.countInStock }));

        toast.success(
          "We’re sorry, due to high demand, the quantity of the item(s) in your cart has been updated based on availability.",
        );
      }
    }
  },
);
