import dotenv from "dotenv";
dotenv.config();
import UserModel from "../models/UserModel.js";
const User = UserModel.User;
import jwt from "jsonwebtoken";

export const userVerification = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ status: false });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      console.log(user);
      if (user) {
        const isAdmin = user.isAdmin;

        return res.json({
          status: true,
          user: `${user.firstName} ${user.lastName}`,
          isAdmin,
        });
      } else {
        return res.json({
          status: false,
          isAdmin: false,
        });
      }
    }
  });
};
export const adminVerification = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ status: false });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user.isAdmin)
        return res.json({
          status: true,
          user: `${user.firstName} ${user.lastName}`,
        });
      else return res.json({ status: false });
    }
  });
};

export const userOrderVerification = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ status: false, message: "Token not found" });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false, message: "Token verification failed" });
    } else {
      const user = await User.findById(data.id);

      // Assuming orderId is passed in the request parameters
      const orderId = req.body.id; // Update this with the correct parameter name

      // Check if the user made the order
      if (user.orders.includes(orderId)) {
        return res.json({
          status: true,
          user: `${user.firstName} ${user.lastName}`,
          message: "User made the order",
        });
      } else {
        return res.json({
          status: false,
          message: "User did not make the order",
        });
      }
    }
  });
};
