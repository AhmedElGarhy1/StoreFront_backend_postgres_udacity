import bcrypt from "bcrypt";
import dotenv from "dotenv";

import { OrderStore, OrderType } from "../../models/orders";
import { UserStore, UserType } from "../../models/users";
import { ProductStore, ProductType } from "../../models/products";

dotenv.config();
const User = new UserStore();

describe("test User Model Class", () => {
  // global vars

  let testUser: UserType = {
    first_name: "test_user",
    last_name: "test_user",
    username: "username_of_test_user_" + Date.now(),
    password: "random pass",
  };

  it("check if add user Method works fine", async () => {
    const user = (await User.add(testUser)) as UserType;
    testUser.id = user?.id as unknown as string;
    expect(user?.first_name).toEqual(testUser.first_name);
    expect(user?.last_name).toEqual(testUser.last_name);
    expect(user?.username).toEqual(testUser?.username);

    const pepper = process.env.BCRYPT_SECRET as unknown as string;
    expect(
      bcrypt.compareSync(testUser.password + pepper, user.password)
    ).toBeTrue();
  });

  it("check if add user Method works fine", async () => {
    const users = await User.index();
    expect(users?.length).not.toBeNaN();
    const lastAddedUser = users?.pop();
    expect(lastAddedUser?.first_name).toEqual(testUser.first_name);
  });
  it("check if add user Method works fine", async () => {
    const user = await User.show(testUser.id || "");
    expect(user?.username).toEqual(testUser?.username);
    expect(user?.first_name).toEqual(testUser?.first_name);
  });
  it("check if add user Method works fine", async () => {
    const user = await User.delete(testUser.id || "");
    expect(user?.username).toEqual(testUser?.username);
    expect(user?.first_name).toEqual(testUser?.first_name);
  });
});
