import { Response } from "express";
import { OrderStore } from "../../models/orders";
import { ProductType } from "../../models/products";
import { checkBodyForOrderProduct, OrderProductType } from "../../utils/order";
import { AuthedRequest } from "../index";

// all have ids and have userId

const Order = new OrderStore();

// need auth
const getActiveOrder = async (
  req: AuthedRequest,
  res: Response
): Promise<void> => {
  const userId = req.userId as unknown as string;
  try {
    const order = await Order.getActiveOrder(userId);
    // it can't happen
    if (!order) {
      await Order.createOrder(userId);
      throw Error(`there are no active orders`);
    }
    res.status(200).json({ data: order });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ msg: err.message });
    } else {
      console.log(err);
    }
  }
};

// need auth
const getCompletedOrders = async (
  req: AuthedRequest,
  res: Response
): Promise<void> => {
  const userId = req.userId as unknown as string;
  try {
    const orders = await Order.getCompletedOrders(userId);
    res.status(200).json({ data: orders });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ msg: err.message });
    } else {
      console.log(err);
    }
  }
};

// need auth
const completOrder = async (
  req: AuthedRequest,
  res: Response
): Promise<void> => {
  const userId = req.userId as unknown as string;
  try {
    const order = await Order.completeOrder(userId);
    await Order.createOrder(userId);
    // it can't happen
    if (!order) throw Error(`there are no active orders`);
    res.status(200).json({ data: order });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ msg: err.message });
    } else {
      console.log(err);
    }
  }
};

// need auth
const addOrderProduct = async (
  req: AuthedRequest,
  res: Response
): Promise<void> => {
  const userId = req.userId as unknown as string;
  const body = req.body as unknown as OrderProductType;
  try {
    checkBodyForOrderProduct(body);

    await Order.addProduct(userId, parseInt(body.quantity), body.productId);

    res.status(200).json({ msg: "Successfully added" });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ msg: err.message });
    } else {
      console.log(err);
    }
  }
};
// need auth
const getOrderProducts = async (
  req: AuthedRequest,
  res: Response
): Promise<void> => {
  const userId = req.userId as unknown as string;
  try {
    const orderProducts = await Order.getOrderProducts(userId);

    res.status(200).json({ data: orderProducts });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ msg: err.message });
    } else {
      console.log(err);
    }
  }
};

export {
  getActiveOrder,
  getCompletedOrders,
  completOrder,
  addOrderProduct,
  getOrderProducts,
};
