import { OrderStore, OrderType } from "../models/orders";
import { UserStore, UserType } from "../models/users";
import { ProductStore, ProductType } from "../models/products";

const Order = new OrderStore();
const User = new UserStore();
const Product = new ProductStore();

describe("test Order Model Class", () => {
  // global vars
  let userId: string = "";
  let productId: string = "";
  let orderId: string = "";

  // testing objects
  const testUser: UserType = {
    first_name: "test_user",
    last_name: "test_user",
    username: "username_of_test_user_" + Date.now(),
    password: "random pass",
  };
  const testProduct: ProductType = {
    category: "phones",
    name: "test_product",
    price: 99999,
  };

  beforeAll(async () => {
    const user = await User.add(testUser);
    const product = await Product.create(testProduct);
    userId = user?.id as unknown as string;
    productId = product?.id as unknown as string;
  });

  it("check if CreateOrder Method works fine", async () => {
    const order = (await Order.createOrder(userId)) as OrderType;
    orderId = order.id as unknown as string;
    expect(order.user_id).toEqual(userId);
    expect(order.status).toBe("ACTIVE");
  });

  it("check if get active order Method works fine", async () => {
    const order = (await Order.getActiveOrder(userId)) as OrderType;
    expect(order.user_id).toEqual(userId);
    expect(order.status).toBe("ACTIVE");
  });

  it("check if add product Method works fine", async () => {
    const productOrder = await Order.addProduct(userId, 5, productId);
    expect(productOrder.product_id).toEqual(productId);
    expect(productOrder.order_id).toBe(orderId);
  });

  it("check if get products in order Method works fine", async () => {
    const products = await Order.getOrderProducts(userId);
    products.forEach((proudct) => {
      expect(proudct.id).toBe(productId);
      expect(proudct.name).toBe(testProduct.name);
      expect(proudct.price).toBe(testProduct.price);
      expect(proudct.category).toBe(testProduct.category);
      expect(proudct.quantity).toBe(5);
      expect(proudct.order_id).toBe(orderId);
    });
  });

  it("check if complete order Method works fine", async () => {
    const order = (await Order.completeOrder(userId)) as OrderType;
    expect(order.user_id).toEqual(userId);
    expect(order.status).toBe("COMPLETE");
  });

  it("check if add product Method works fine", async () => {
    const completedOrders = (await Order.getCompletedOrders(
      userId
    )) as OrderType[];
    completedOrders.forEach((order) => {
      expect(order.user_id).toEqual(userId);
      expect(order.status).toEqual("COMPLETE");
    });
  });
});
