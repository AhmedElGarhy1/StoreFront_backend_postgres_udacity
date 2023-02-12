import db from "../database";

export interface OrderProductType {
  id?: string;
  quantity: string;
  productId: string;
}
export interface OrderType {
  id?: string;
  user_id: string;
  status: string;
}

export class OrderStore {
  async createOrder(userId: string) {
    try {
      const conn = await db.connect();
      const sql = `INSERT INTO orders(user_id) VALUES($1) RETURNING *`;
      const response = await conn.query(sql, [userId]);
      conn.release();
      return response.rows[0];
    } catch (err) {
      throw Error("Couldn't create order error " + err);
    }
  }

  async addProduct(userId: string, quantity: number, productId: string) {
    try {
      const conn = await db.connect();

      const sql1 = `SELECT id FROM orders WHERE user_id=$1`;
      const initResponse = await conn.query(sql1, [userId]);
      const orderId = initResponse.rows[0].id;

      const sql2 = `INSERT INTO order_products(order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *`;
      const sqlArr = [orderId, productId, quantity];
      const response = await conn.query(sql2, sqlArr);

      conn.release();
      return response.rows[0];
    } catch (err) {
      throw Error("Couldn't add order error " + err);
    }
  }

  async getOrderProducts(userId: string) {
    try {
      const conn = await db.connect();

      const sql = `SELECT p.id, p.name, p.price, p.category, op.quantity, op.order_id FROM orders o 
      INNER JOIN order_products op
      ON o.id = op.order_id
      INNER JOIN products p
      ON op.product_id = p.id
      WHERE o.user_id = $1 AND o.status='ACTIVE'`;
      const response = await conn.query(sql, [userId]);

      conn.release();
      return response.rows;
    } catch (err) {
      throw Error("Couldn't get order products error " + err);
    }
  }

  async completeOrder(userId: string) {
    try {
      const conn = await db.connect();
      const sql = `
      UPDATE orders SET status = 'COMPLETE' 
      WHERE user_id=$1 AND status='ACTIVE' RETURNING *`;
      const response = await conn.query(sql, [userId]);
      conn.release();
      return response.rows[0];
    } catch (err) {
      throw Error("Couldn't create order error " + err);
    }
  }

  async getCompletedOrders(userId: string) {
    try {
      const conn = await db.connect();
      const sql = `SELECT * FROM orders WHERE status='COMPLETE' AND user_id=$1`;
      const response = await conn.query(sql, [userId]);
      conn.release();
      return response.rows;
    } catch (err) {
      throw Error("Couldn't create order error " + err);
    }
  }

  async getActiveOrder(userId: string) {
    try {
      const conn = await db.connect();
      const sql = `SELECT * FROM orders WHERE status='ACTIVE' AND user_id=$1`;
      const response = await conn.query(sql, [userId]);
      conn.release();
      return response.rows[0];
    } catch (err) {
      throw Error("Couldn't create order error " + err);
    }
  }
}
