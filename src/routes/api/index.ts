import express from "express";

import ordersRouter from "./orders";
import productRoter from "./products";
import usersRouter from "./users";

const router = express.Router();

router.use("/orders", ordersRouter);
router.use("/products", productRoter);
router.use("/users", usersRouter);

export default router;
