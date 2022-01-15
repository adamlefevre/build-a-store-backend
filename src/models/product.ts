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
        const sql = `SELECT * FROM products WHERE id = ${id}`;
        const result = await conn.query(sql);
        const { rows } = result;
        const product = {
          id: rows[0].id,
          name: rows[0].name,
          price: Number(rows[0].price),
          category: rows[0].category
        }
        conn.release();
        return product;
      } catch (err) {
        throw new Error(`Cannot get product with id ${id}. Error: ${err}`);
      }
  }

  async create(p: Product): Promise<Product> {
      try {
        const conn = await client.connect();
        const sql = `INSERT INTO products (name, category, price) VALUES ('${p.name}', '${p.category}', ${p.price}) RETURNING *`;
        const result = await conn.query(sql);
        const { rows } = result;
        const product = {
          id: rows[0].id,
          name: rows[0].name,
          price: Number(rows[0].price),
          category: rows[0].category
        }
        conn.release();
        return product;
      } catch (err) {
        throw new Error(`Cannot create product {name: '${p.name}', category: '${p.category}', price: ${p.price} }. Error: ${err}`);
      }
  }

  async update(p: Product): Promise<Product> {
      try {
        const conn = await client.connect();
        const sql = `UPDATE products SET name = '${p.name}', category = '${p.category}', price = ${p.price} WHERE id = ${p.id} RETURNING *`;
        const result = await conn.query(sql);
        const { rows } = result;
        const product = {
          id: rows[0].id,
          name: rows[0].name,
          price: Number(rows[0].price),
          category: rows[0].category
        }
        conn.release();
        return product;
      } catch (err) {
        throw new Error(`Cannot update product with id ${p.id}. Error: ${err}`);
      }
  }

  async delete(id: number): Promise<Product> {
      try {
        const conn = await client.connect();
        const sql = `DELETE FROM products WHERE id = ${id} RETURNING *`;
        const result = await conn.query(sql);
        const { rows } = result;
        const product = {
          id: rows[0].id,
          name: rows[0].name,
          price: Number(rows[0].price),
          category: rows[0].category
        }
        conn.release();
        return product;
      } catch (err) {
        throw new Error(`Cannot delete with id ${id}. Error: ${err}`);
      }
  }
};
