import { ProductType } from "../models/products";

export const checkBodyForProduct = (product: ProductType) => {
  if (!product) throw Error("Please provide the body");
  if (!product.name) throw Error("Please provide the name");
  if (!product.price) throw Error("Please provide the price");
};
