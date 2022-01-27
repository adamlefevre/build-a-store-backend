import client from '../database';

export type Order = {
  id?: number;
  user_id: string;
  status: string;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
        const conn = await client.connect();
        const sql = "SELECT * FROM orders";
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
    } catch (err) {
        throw new Error(`Cannot get Orders. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
      try {
        const conn = await client.connect();
        const sql = `SELECT * FROM orders WHERE id = ${id}`;
        const result = await conn.query(sql);
        const { rows } = result;
        const order: Order = {
          id: rows[0].id,
          user_id: rows[0].user_id,
          status: rows[0].status
        }
        conn.release();
        return order;
      } catch (err) {
        throw new Error(`Cannot get Order with id ${id}. Error: ${err}`);
      }
  }

  async create(o: Order): Promise<Order> {
      try {
        const conn = await client.connect();
        const sql = `INSERT INTO orders (user_id, status) VALUES ('${o.user_id}', '${o.status}') RETURNING *`;
        const result = await conn.query(sql);
        const { rows } = result;
        const order: Order = {
            id: rows[0].id,
            user_id: rows[0].user_id,
            status: rows[0].status
          }
        conn.release();
        return order;
      } catch (err) {
        throw new Error(`Cannot create order {user_id: '${o.user_id}', lastName: '${o.status}' }. Error: ${err}`);
      }
  }

  async update(o: Order): Promise<Order> {
      try {
        const conn = await client.connect();
        const sql = `UPDATE orders SET user_id = '${o.user_id}', status = '${o.status}' WHERE id = ${o.id} RETURNING *`;
        const result = await conn.query(sql);
        const { rows } = result;
        const order: Order  = {
            id: rows[0].id,
            user_id: rows[0].user_id,
            status: rows[0].status
          }
        conn.release();
        return order;
      } catch (err) {
        throw new Error(`Cannot update order with id ${o.id}. Error: ${err}`);
      }
  }

  async delete(id: number): Promise<Order> {
      try {
        const conn = await client.connect();
        const sql = `DELETE FROM orders WHERE id = ${id} RETURNING *`;
        const result = await conn.query(sql);
        const { rows } = result;
        const order: Order = {
            id: rows[0].id,
            user_id: rows[0].user_id,
            status: rows[0].status
          }
        conn.release();
        return order;
      } catch (err) {
        throw new Error(`Cannot delete order with id ${id}. Error: ${err}`);
      }
  }
};
