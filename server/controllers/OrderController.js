import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
import { Pagination } from "../util/Pagination.js";
const User = UserModel.User;
const Order = UserModel.Order;

export const createOrder = async (req, res) => {
  try {
    const { products, shippingAddress, fullPayerName } = req.body;

    // Extract the token from the request cookies
    const token = req.cookies.token;

    // Verify the token and extract the user data
    const data = jwt.verify(token, process.env.TOKEN_KEY);

    // Get the user ID from the token data
    const userId = data.id;

    if (!token) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    // Create new order
    const order = new Order({
      user: userId,
      products: products.map((product) => {
        return {
          productTitle: product.name,
          productId: product._id,
          price: product.price,
          quantity: product.qty,
          image: product.image,
          hasShipped: false,
        };
      }),
      orderTotal: products.reduce(
        (total, product) => total + product.price * product.qty,
        0
      ),
      shippingAddress,
      fullPayerName,
    });

    // Save the order
    const savedOrder = await order.save();

    // Find the user and update orders array
    const user = await User.findById(userId);
    user.orders.push(savedOrder._id);
    await user.save();

    res.status(200).json(savedOrder._id);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.toString() });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "firstName lastName"
    );
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

// Use the pagination middleware function in your controller
export const getUserOrders = async (req, res) => {
  try {
    // Extract the token from the request cookies
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const data = jwt.verify(token, process.env.TOKEN_KEY);

    const userId = data.id;

    const filter = { user: userId };

    await Pagination(Order, filter)(req, res);

    res.status(200).json(res.paginatedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};
