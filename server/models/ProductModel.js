import mongoose from "mongoose";

const reviewModel = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  reviewTitle: {
    type: String,
    required: true,
  },
  reviewDescription: {
    type: String,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  countInStock: { type: Number, required: true },
  price: { type: Number, required: true },
  image: {
    url: { type: String },
  },
  screenSize: { type: Number },
  storage: { type: Number },
  cameraPixels: { type: Number },
  batteryMah: { type: Number },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Product = mongoose.model("Product", productSchema);
const Review = mongoose.model("Review", reviewModel);

export default { Product, Review };
