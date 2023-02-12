import jwt from "jsonwebtoken";
import { UserType } from "../models/users";
import dotenv from "dotenv";

dotenv.config();

export const checkBodyForUser = (user: UserType) => {
  if (!user) throw Error("Please provide the body");
  if (!user.first_name) throw Error("Please provide the first_name");
  if (!user.last_name) throw Error("Please provide the last_name");
  if (!user.username) throw Error("Please provide the username");
  if (!user.password) throw Error("Please provide the password");
};

export const createToken = (data: any): string => {
  const secret = process.env.JWT_SECRET as string;
  const token = jwt.sign(data, secret);
  return token;
};
