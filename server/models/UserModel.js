import mongoose from "mongoose";
import bcrypt from "bcrypt";

const addressModel = new mongoose.Schema({
  streetAddress: {
    type: String,
    required: [true, "Your street is required"],
  },

  city: {
    type: String,
    required: [true, "Your city is required"],
  },
  state: {
    type: String,
    required: [true, "Your state is required"],
  },
  country: {
    type: String,
    required: [true, "Your country is required"],
  },
  zip: {
    type: String,
    required: [true, "Your postal code is required"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Your phone number is required"],
  },
});

const orderModel = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  products: [
    {
      productTitle: String,
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      price: Number,
      quantity: Number,
      image: {
        type: String,
        required: true,
      },
    },
  ],
  orderTotal: {
    type: Number,
    required: true,
  },

  fullPayerName: {
    type: String,
    required: true,
  },

  shippingAddress: {
    streetAddress: String,
    city: String,
    state: String,
    country: String,
    zip: String,
    phoneNumber: String,
  },

  hasShipped: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  firstName: {
    type: String,
    required: [true, "Your first name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Your last name is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  address: addressModel,
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const User = mongoose.model("User", userSchema);
const Order = mongoose.model("Order", orderModel);

export default { User, Order };
