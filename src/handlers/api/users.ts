import { Request, Response } from "express";
import { AuthedRequest } from "..";
import { OrderStore } from "../../models/orders";
import { UserStore, UserType } from "../../models/users";
import { checkBodyForUser, createToken } from "../../utils/users";

const User = new UserStore();
const Order = new OrderStore();

// need auth
const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.index();
    res.status(200).json({ data: users });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ msg: err.message });
    } else {
      console.log("somthing went wrong in Users Controller getAllUsers Func");
    }
  }
};

// need auth && generate token

const getUser = async (req: AuthedRequest, res: Response): Promise<void> => {
  const userId = req.params.id;
  try {
    const user = await User.show(userId);

    const token = createToken(user?.id);

    res.status(200).json({ data: user, token });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ msg: err.message });
    } else {
      console.log("somthing went wrong in Users Controller getUser Func");
    }
  }
};

// generate token
const createUser = async (req: Request, res: Response): Promise<void> => {
  const body = req.body as UserType;
  try {
    checkBodyForUser(body);
    const user = (await User.add(body)) as UserType;
    const userId = user.id as unknown as string;
    await Order.createOrder(userId);

    const token = createToken(userId);

    const { first_name, last_name, username } = user;
    res
      .status(200)
      .json({ data: { first_name, last_name, username, id: userId }, token });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ msg: err.message });
    } else {
      console.log("somthing went wrong in Users Controller getUser Func");
    }
  }
};

export { getAllUsers, getUser, createUser };
