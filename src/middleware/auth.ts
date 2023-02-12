import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UserStore, UserType } from "../models/users";
import { AuthedRequest } from "../handlers";

const db = new UserStore();

const auth = async (req: AuthedRequest, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.headers.authorization;
    const token = Authorization?.split(" ")[1] as string;
    const userId = jwt.decode(token) as string;

    const user = await db.show(userId);
    req.userId = user?.id as unknown as string;

    if (!user) throw Error();
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid token, please provide a valid one" });
  }
};

export default auth;
