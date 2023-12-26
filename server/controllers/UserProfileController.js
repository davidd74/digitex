import UserModel from "../models/UserModel.js";
const User = UserModel.User;
import bcrypt from "bcrypt";

export const setUserAddress = async (req, res) => {
  const { email, streetAddress, city, state, zip, phoneNumber, country } =
    req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      user.address = {
        streetAddress,
        city,
        state,
        zip,
        phoneNumber,
        country,
      };
      const updatedUser = await user.save();
      res.status(200).json({ updatedUser, success: "true" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserDetails = async (req, res) => {
  const { firstName, lastName, password, email, currentEmail } = req.body;
  console.log("got credentials");

  try {
    const user = await User.findOne({ email: currentEmail });
    if (user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.password = hashedPassword;

      const updatedUser = await user.save();
      res.status(200).json({ updatedUser, success: "true" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
