import UserModel from "../models/UserModel.js";
const User = UserModel.User;

import { createSecretToken } from "../util/SecretToken.js";
import bcrypt from "bcrypt";

export const Signup = async (req, res, next) => {
  try {
    const {
      _id,
      email,
      password,
      firstName,
      lastName,
      isAdmin,
      createdAt,
      shippingAddress,
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        message: `Missing required fields ${
          (password, firstName, lastName, email)
        }`,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      _id,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      isAdmin,
      createdAt,
      shippingAddress,
    });

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res
      .status(201)
      .json({ message: "User signed up successfully", success: true, user });
    next();
  } catch (err) {
    console.log(err);
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "Invalid email or password" });
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return res.json({ message: "Invalid email or password" });
    }

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(201).json({ message: "Signed in!", success: true, user });

    next();
  } catch (error) {
    console.log(error);
  }
};
