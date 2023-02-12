import { ProductStore, ProductType } from "../models/products";

const Product = new ProductStore();

describe("test Product Model Class", () => {
  let testProduct: ProductType = {
    category: "phones",
    name: "test_product",
    price: 99999,
  };

  it("check if create product Method works fine", async () => {
    const product = await Product.create(testProduct);
    testProduct.id = product.id as unknown as string;
    expect(product).toEqual(testProduct);
  });

  it("check if get all products Method works fine", async () => {
    const products = await Product.index();
    expect(products).toContain(testProduct);
  });

  it("check if show (get single product) Method works fine", async () => {
    const product = await Product.show(testProduct.id || "");
    expect(product).toEqual(testProduct);
  });

  it("check if getMostPopular Method works fine", async () => {
    const getMostPopularFive = await Product.getMostPopular();
    expect(getMostPopularFive.length).toBeLessThanOrEqual(5);
  });

  it("check if getProductsByCategory Method works fine", async () => {
    const products = await Product.getProductsByCategory(testProduct.category);
    const lastProduct = products.pop();
    expect(lastProduct).toEqual(testProduct);
  });

  it("check if CreateOrder Method works fine", async () => {
    const product = await Product.delete(testProduct.id || "");
    expect(product).toEqual(testProduct);
  });
});
