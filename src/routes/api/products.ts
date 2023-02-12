import express from "express";
import {
  getAllProducts,
  getProduct,
  createProduct,
  getMostPopular,
  productByCategory,
} from "../../handlers/api/products";
import auth from "../../middleware/auth";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", auth, createProduct);
router.get("/popular", getMostPopular);
router.get("/:id", getProduct);
router.get("/category/:category", productByCategory);

export default router;
