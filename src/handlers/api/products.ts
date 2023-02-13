import { Request, Response } from "express";

import { ProductStore, ProductType } from "../../models/products";
import { checkBodyForProduct } from "../../utils/product";

const Product = new ProductStore();

const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.index();
    res.status(200).json({ data: products });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ msg: err.message });
    } else {
      console.log(
        "somthing went wrong in Products Controller getAllProducts Func"
      );
    }
  }
};

const getProduct = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    const product = await Product.show(id);
    res.status(200).json({ data: product });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ msg: err.message });
    } else {
      console.log("somthing went wrong in Products Controller getProduct Func");
    }
  }
};

const getMostPopular = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.getMostPopular();
    res.status(200).json({ data: products });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ msg: err.message });
    } else {
      console.log(
        "somthing went wrong in Products Controller getMostPopular Func"
      );
    }
  }
};

const productByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const category = req.params.category;
  try {
    const products = await Product.getProductsByCategory(category);
    res.status(200).json({ data: products });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ msg: err.message });
    } else {
      console.log(
        "somthing went wrong in Products Controller createProduct Func"
      );
    }
  }
};

// need auth
const createProduct = async (req: Request, res: Response): Promise<void> => {
  const body = req.body as ProductType;
  try {
    checkBodyForProduct(body);
    const product = await Product.create(body);
    res.status(200).json({ data: product });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ msg: err.message });
    } else {
      console.log(
        "somthing went wrong in Products Controller createProduct Func"
      );
    }
  }
};

export {
  getAllProducts,
  getProduct,
  createProduct,
  getMostPopular,
  productByCategory,
};
