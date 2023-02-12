import { OrderProductType } from "../models/orders";

export const checkBodyForOrderProduct = (product: OrderProductType) => {
  if (!product) throw Error("please provide a body");
  if (!product.quantity) throw Error("please provide a product quantity");
  if (!product.productId) throw Error("please provide a productId");
};

export { OrderProductType };
