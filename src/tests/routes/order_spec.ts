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
let userId: string;
let productId: string;

describe("test user endpoints", () => {
  it("check if server is running", async () => {
    const res = await request.get("/");
    expect(res.status).toBe(404);
  });
  beforeAll(async () => {
    // create user
    const userRes = await request.post("/api/users/").send(testUser);
    const userBody = userRes.body;
    token = userBody.token;
    userId = userBody.data.id;

    // create product
    const productRes = await request
      .post("/api/products/")
      .send(testProduct)
      .set("Authorization", "barear " + token);
    const productBody = productRes.body;
    productId = productBody.data.id as unknown as string;
  });

  describe("POST - api/orders/", () => {
    it("add product to order", async () => {
      const res = await request
        .post("/api/orders/")
        .send({
          productId: productId,
          quantity: 50,
        })
        .set("Authorization", "barear " + token);
      expect(res.status).toBe(200);
    });
  });

  describe("GET - api/orders/", () => {
    it("get order products", async () => {
      const res = await request
        .get("/api/orders/")
        .set("Authorization", "barear " + token);

      const products = res.body.data;
      const product = products[0];
      expect(product.name).toBe(testProduct.name);
      expect(product.price).toBe(testProduct.price);
      expect(product.category).toBe(testProduct.category);
      expect(product.quantity).toBe(50);
    });
  });

  describe("GET - api/orders/active", () => {
    it("get current active order", async () => {
      const res = await request
        .get("/api/orders/active")
        .set("Authorization", "barear " + token);

      const order = res.body.data;
      expect(order.user_id).toBe(userId);
      expect(order.status).toBe("ACTIVE");
    });
  });

  describe("PATCH - api/orders/complete", () => {
    it("update current order status", async () => {
      const res = await request
        .patch("/api/orders/complete")
        .set("Authorization", "barear " + token);

      const order = res.body.data;
      expect(order.status).toBe("COMPLETE");
    });
  });

  describe("GET - api/orders/complete", () => {
    it("get all completed orders", async () => {
      const res = await request
        .get("/api/orders/complete")
        .set("Authorization", "barear " + token);

      const orders = res.body.data;
      const order = orders[0];

      expect(order.user_id).toBe(userId);
      expect(order.status).toBe("COMPLETE");
    });
  });
});
