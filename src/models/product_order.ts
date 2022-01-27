import client from '../database';

export type ProductOrder = {
  id?: number;
  user_id: string;
  status: string;
};

export class ProductOrderStore {
  async index(): Promise<ProductOrder[]> {
    try {
        const conn = await client.connect();
        const sql = "SELECT * FROM product_orders";
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
    } catch (err) {
        throw new Error(`Cannot get ProductOrders. Error: ${err}`);
    }
  }

  async show(id: number): Promise<ProductOrder> {
      try {
        const conn = await client.connect();
        const sql = `SELECT * FROM product_orders WHERE id = ${id}`;
        const result = await conn.query(sql);
        const { rows } = result;
        const productOrder: ProductOrder = {
          id: rows[0].id,
          user_id: rows[0].user_id,
          status: rows[0].status
        }
        conn.release();
        return productOrder;
      } catch (err) {
        throw new Error(`Cannot get ProductOrder with id ${id}. Error: ${err}`);
      }
  }

  async create(po: ProductOrder): Promise<ProductOrder> {
      try {
        const conn = await client.connect();
        const sql = `INSERT INTO product_orders (user_id, status) VALUES ('${po.user_id}', '${po.status}') RETURNING *`;
        const result = await conn.query(sql);
        const { rows } = result;
        const productOrder: ProductOrder = {
            id: rows[0].id,
            user_id: rows[0].user_id,
            status: rows[0].status
          }
        conn.release();
        return productOrder;
      } catch (err) {
        throw new Error(`Cannot create order {user_id: '${po.user_id}', lastName: '${po.status}' }. Error: ${err}`);
      }
  }

  async update(po : ProductOrder): Promise<ProductOrder> {
      try {
        const conn = await client.connect();
        const sql = `UPDATE product_orders SET user_id = '${po.user_id}', status = '${po.status}' WHERE id = ${po.id} RETURNING *`;
        const result = await conn.query(sql);
        const { rows } = result;
        const productOrder: ProductOrder  = {
            id: rows[0].id,
            user_id: rows[0].user_id,
            status: rows[0].status
          }
        conn.release();
        return productOrder;
      } catch (err) {
        throw new Error(`Cannot update order with id ${po.id}. Error: ${err}`);
      }
  }

  async delete(id: number): Promise<ProductOrder> {
      try {
        const conn = await client.connect();
        const sql = `DELETE FROM product_orders WHERE id = ${id} RETURNING *`;
        const result = await conn.query(sql);
        const { rows } = result;
        const productOrder: ProductOrder = {
            id: rows[0].id,
            user_id: rows[0].user_id,
            status: rows[0].status
          }
        conn.release();
        return productOrder;
      } catch (err) {
        throw new Error(`Cannot delete order with id ${id}. Error: ${err}`);
      }
  }
};
