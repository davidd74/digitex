import { createSlice } from "@reduxjs/toolkit";

const getInitialCart = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const calculateTotal = (cartItems) =>
  cartItems.reduce((total, item) => total + item.price * item.qty, 0);

const cartSlice = createSlice({
  name: "cartItems",
  initialState: {
    // render existing cart items if there are any
    cartItems: getInitialCart(),
    total: calculateTotal(getInitialCart()),
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cartItems.find(
        (item) => item._id === action.payload._id,
      );
      if (itemInCart) {
        // Check if the new quantity is less than or equal to the available quantity
        if (itemInCart.qty + action.payload.qty <= action.payload.quantity) {
          itemInCart.qty += action.payload.qty;
        }
      } else {
        state.cartItems.push({
          _id: action.payload._id,
          name: action.payload.name,
          image: action.payload.image.url,
          qty: action.payload.qty,
          price: action.payload.price,
          countInStock: action.payload.countInStock,
        });
      }
      // save to the local storage
      saveCart(state.cartItems);
      state.total = calculateTotal(state.cartItems);
    },
    removeFromCart: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item._id === action.payload._id,
      );
      if (index !== -1) {
        state.cartItems.splice(index, 1);
      }
      saveCart(state.cartItems);
      state.total = calculateTotal(state.cartItems);
    },
    updateQuantity: (state, action) => {
      const itemInCart = state.cartItems.find(
        (item) => item._id === action.payload._id,
      );
      if (itemInCart) {
        // Ensure new qty is not greater than available stock
        const newQty = Math.min(action.payload.qty, itemInCart.countInStock);
        itemInCart.qty = newQty;
      }
      saveCart(state.cartItems);
      state.total = calculateTotal(state.cartItems);
    },

    clearCart: (state) => {
      state.cartItems = [];
      saveCart(state.cartItems);
      state.total = calculateTotal(state.cartItems);
    },

    updateCountInStock: (state, action) => {
      const { id, countInStock } = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => item._id === id);
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].countInStock = countInStock;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  updateCountInStock,
} = cartSlice.actions;

export default cartSlice.reducer;
