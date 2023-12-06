import {
  getProducts,
  getProductById,
  decrementProductQuantity,
  postProductReview,
} from "../controllers/ProductController.js";
import express from "express";
const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/:id/reviews", postProductReview);
router.put("/countinstock", decrementProductQuantity);

export default router;
