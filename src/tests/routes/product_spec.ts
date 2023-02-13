import app from "../../server";
import supertest from "supertest";

const request = supertest(app);

const testProduct = {
  name: "test_product",
  price: 2000,
  category: "laptops",
};
const testUser = {
  first_name: "test_user",
  last_name: "test_user",
  username: "username_of_test_user_" + Date.now(),
  password: "random pass",
};

let token: string;
let productId: string;

describe("test user endpoints", () => {
  it("check if server is running", async () => {
    const res = await request.get("/");
    expect(res.status).toBe(404);
  });
  beforeAll(async () => {
    const res = await request.post("/api/users/").send(testUser);
    const body = res.body;
    token = body.token;
  });
  describe("POST - api/products/", () => {
    it("create proudct", async () => {
      const res = await request
        .post("/api/products/")
        .send(testProduct)
        .set("Authorization", "barear " + token);
      const product = res.body.data;
      productId = product.id as unknown as string;
      expect(product.name).toBe(testProduct.name);
      expect(product.price).toBe(testProduct.price);
    });
  });

  describe("GET - api/products/", () => {
    it("get all proudcts", async () => {
      const res = await request.get("/api/products/");

      const products = res.body.data;
      const lastProduct = products.pop();
      expect(lastProduct.name).toBe(testProduct.name);
      expect(lastProduct.price).toBe(testProduct.price);
    });
  });

  describe("GET /api/products/:id", () => {
    it("get product", async () => {
      const res = await request.get("/api/products/" + productId);
      const proudct = res.body.data;
      expect(proudct.name).toBe(testProduct.name);
      expect(proudct.price).toBe(testProduct.price);
    });
  });

  describe("GET /api/products/popular", () => {
    it("get most pupular 5 products", async () => {
      const res = await request.get("/api/products/popular");
      const proudcts = res.body.data;
      expect(proudcts.length).toBeLessThanOrEqual(5);
    });
  });

  describe("GET /api/products/category/:categoryName", () => {
    it("get most pupular 5 products", async () => {
      const res = await request.get(
        "/api/products/category/" + testProduct.category
      );
      const proudcts = res.body.data;
      proudcts.forEach((product: any) => {
        expect(product.category).toBe(testProduct.category);
      });
    });
  });
});
