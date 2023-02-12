import bcrypt from "bcrypt";
import Client from "../database";

export interface UserType {
  id?: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
}

type u = undefined;

export class UserStore {
  // return all users
  async index(): Promise<UserType[] | u> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";
      const response = await conn.query(sql);
      conn.release();

      return response.rows;
    } catch (err) {
      throw Error(`couldn't display all users error ${err}`);
    }
  }

  // return user by it's id
  async show(id: string): Promise<UserType | u> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users where id=$1";
      const response = await conn.query(sql, [id]);
      conn.release();
      return response.rows[0];
    } catch (err) {
      throw Error(`couldn't show user ${err}`);
    }
  }

  // add user and return it
  async add(user: UserType): Promise<UserType | u> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO users(first_name, last_name, username, password) VALUES($1, $2, $3, $4) RETURNING *";
      const soltRound = process.env.SALT_ROUND as unknown as string;
      const papper = process.env.BCRYPT_SECRET;

      const hashedPassword = bcrypt.hashSync(
        user.password + papper,
        parseInt(soltRound)
      );

      const sqlArr = [
        user.first_name,
        user.last_name,
        user.username,
        hashedPassword,
      ];

      const response = await conn.query(sql, sqlArr);

      conn.release();
      return response.rows[0];
    } catch (err) {
      throw Error(`couldn't create user error ${err}`);
    }
  }
  // delete user and return it
  async delete(userId: string): Promise<UserType | u> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE FROM users WHERE id=$1 RETURNING *";

      const response = await conn.query(sql, [userId]);

      conn.release();
      return response.rows[0];
    } catch (err) {
      throw Error(`couldn't delete user error ${err}`);
    }
  }
}
