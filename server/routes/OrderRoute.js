import {
  createOrder,
  getOrder,
  getUserOrders,
} from "../controllers/OrderController.js";
import express from "express";
const router = express.Router();

router.post("/order", createOrder);
router.get("/orders/user", getUserOrders);
router.get("/orders/:id", getOrder);
export default router;
