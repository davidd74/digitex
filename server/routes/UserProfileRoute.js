import express from "express";
import {
  setUserAddress,
  updateUserDetails,
} from "../controllers/UserProfileController.js";
const router = express.Router();

router.post("/address", setUserAddress);
router.put("/update-details", updateUserDetails);

export default router;
