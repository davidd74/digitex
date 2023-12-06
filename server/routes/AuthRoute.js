import { Signup, Login } from "../controllers/AuthController.js";
import {
  userVerification,
  adminVerification,
  userOrderVerification,
} from "../middlewares/AuthMiddleware.js";
import express from "express";
const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/private", userVerification);
router.post("/orderauth", userOrderVerification);
router.post("/admin", adminVerification);

export default router;
