import client from "../database";

export interface ProductType {
  id?: string;
  name: string;
  price: number;
  category: string;
}

export class ProductStore {
  async index() {
    try {
      const conn = await client.connect();
      const sql = "SELECT * from products";
      const response = await conn.query(sql);
      conn.release();
      return response.rows;
    } catch (err) {
      throw Error(`coudnt get products error ${err}`);
    }
  }

  async show(productId: string) {
    try {
      const conn = await client.connect();
      const sql = "SELECT * from products where id=$1";
      const response = await conn.query(sql, [productId]);
      conn.release();
      return response.rows[0];
    } catch (err) {
      throw Error(`couldn't get the product error ${err}`);
    }
  }
  async create(product: ProductType) {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO products(name, price, category) VALUES($1, $2, $3) RETURNING *";
      const sqlArr = [product.name, product.price, product.category];
      const response = await conn.query(sql, sqlArr);
      conn.release();
      return response.rows[0];
    } catch (err) {
      throw Error(`couldn't create the product error ${err}`);
    }
  }
  async getMostPopular() {
    try {
      const conn = await client.connect();
      const sql = "SELECT * from products ORDER BY price LIMIT 5";
      const response = await conn.query(sql);
      conn.release();
      return response.rows;
    } catch (err) {
      throw Error(`couldnt get popular products error ${err}`);
    }
  }
  async getProductsByCategory(category: string) {
    try {
      const conn = await client.connect();
      const sql = "SELECT * from products where category=$1";
      const response = await conn.query(sql, [category]);
      conn.release();
      return response.rows;
    } catch (err) {
      throw Error(`couldn't get products by category`);
    }
  }
  async delete(productId: string) {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM products WHERE id=$1 RETURNING *";
      const response = await conn.query(sql, [productId]);
      conn.release();
      return response.rows[0];
    } catch (err) {
      throw Error(`couldn't get products by category`);
    }
  }
}
