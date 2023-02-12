import express from "express";
import {
  getActiveOrder,
  getCompletedOrders,
  addOrderProduct,
  completOrder,
  getOrderProducts,
} from "../../handlers/api/orders";
import auth from "../../middleware/auth";

const router = express.Router();

router.get("/", auth, getOrderProducts);
router.post("/", auth, addOrderProduct);
router.get("/complete", auth, getCompletedOrders);
router.patch("/complete", auth, completOrder);
router.get("/active", auth, getActiveOrder);

export default router;
