import client from '../database';

export type Product = {
  id?: number;
  name: string;
  category: string;
  price: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
        const conn = await client.connect();
        const sql = "SELECT * FROM products";
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
    } catch (err) {
        throw new Error(`Cannot get products. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Product> {
      try {
        const conn = await client.connect();
        const sql = "SELECT * FROM products WHERE id = ($1)";
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0];
      } catch (err) {
        throw new Error(`Cannot get product with id ${id}. Error: ${err}`);
      }
  }

  async create(p: Product): Promise<Product> {
      try {
        const conn = await client.connect();
        const sql = "INSERT INTO products (name, category, price) VALUES ($1, $2, $3) RETURNING *";
        const result = await conn.query(sql, [p.name, p.category, p.price]);
        conn.release();
        return result.rows[0];
      } catch (err) {
        throw new Error(`Cannot create product {name: ${p.name}, category: ${p.category}, price: ${p.price} }. Error: ${err}`);
      }
  }

  async update(p: Product): Promise<Product> {
      try {
        const conn = await client.connect();
        const sql = "UPDATE products SET name = ($2), category = ($3), price = ($4) WHERE id = ($1) RETURNING *";
        const result = await conn.query(sql);
        conn.release();
        return result.rows[0];
      } catch (err) {
        throw new Error(`Cannot get product with id ${p.id}. Error: ${err}`);
      }
  }

  async delete(id: number): Promise<Product> {
      try {
        const conn = await client.connect();
        const sql = "DELETE FROM products WHERE id = ($1);";
        const result = await conn.query(sql);
        conn.release();
        return result.rows[0];
      } catch (err) {
        throw new Error(`Cannot delete with id ${id}. Error: ${err}`);
      }
  }
};
