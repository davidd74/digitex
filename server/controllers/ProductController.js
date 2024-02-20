import ProductModel from "../models/ProductModel.js";
import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const Product = ProductModel.Product;
const Review = ProductModel.Review;
const User = UserModel.User;

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate({
      path: "reviews",
      select: "rating",
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate({
      path: "reviews",
      populate: {
        path: "user",
        select: "firstName",
      },
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const decrementProductQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.countInStock < quantity) {
      return res
        .status(400)
        .json({ message: "Insufficient quantity in stock" });
    }

    if (quantity) {
      product.countInStock -= quantity;
    }
    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const postProductReview = async (req, res) => {
  try {
    const { rating, reviewTitle, reviewDescription, productId } = req.body;
    console.log("Request Body:", req.body);

    const token = req.cookies.token;
    const data = jwt.verify(token, process.env.TOKEN_KEY);
    const userId = data.id;
    console.log("User ID:", userId);

    const existingReview = await Review.findOne({
      user: userId,
      productId: productId,
    });
    console.log("check for existingReview");

    if (existingReview) {
      return res.status(200).json({
        message: "You already reviewed this product",
        success: false,
      });
    }

    const postReview = await Review.create({
      user: userId,
      rating: rating,
      reviewTitle: reviewTitle,
      reviewDescription: reviewDescription,
      productId: productId,
    });

    console.log("Review created:", postReview);

    const product = await Product.findById(productId);
    const user = await User.findById(userId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!product.reviews) {
      product.reviews = [];
    }

    user.reviews.push(postReview._id);
    product.reviews.push(postReview);

    await user.save();
    await product.save();

    res.status(200).json({
      review: postReview,
      success: true,
      message: "Review posted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
