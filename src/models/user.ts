import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const {
    BCRYPT_PASSWORD,
    SALT_ROUNDS
} = process.env;

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
        const conn = await client.connect();
        const sql = "SELECT * FROM users";
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
    } catch (err) {
        throw new Error(`Cannot get users. Error: ${err}`);
    }
  }

  async show(id: number): Promise<User> {
      try {
        const conn = await client.connect();
        const sql = `SELECT * FROM users WHERE id = ${id}`;
        const result = await conn.query(sql);
        const { rows } = result;
        const user = {
          id: rows[0].id,
          firstName: rows[0].firstName,
          lastName: rows[0].lastName,
          password: rows[0].password
        }
        conn.release();
        return user;
      } catch (err) {
        throw new Error(`Cannot get user with id ${id}. Error: ${err}`);
      }
  }

  async create(u: User): Promise<User> {
      try {
        const conn = await client.connect();
        const sql = `INSERT INTO users (firstName, lastName, password) VALUES ('${u.firstName}', '${u.lastName}', ${u.password}) RETURNING *`;
        const result = await conn.query(sql);
        const { rows } = result;
        const user = {
            id: rows[0].id,
            firstName: rows[0].firstName,
            lastName: rows[0].lastName,
            password: rows[0].password
          }
        conn.release();
        return user;
      } catch (err) {
        throw new Error(`Cannot create user {firstName: '${u.firstName}', lastName: '${u.lastName}', password: ${u.password} }. Error: ${err}`);
      }
  }

  async update(u: User): Promise<User> {
      try {
        const conn = await client.connect();
        const sql = `UPDATE users SET firstName = '${u.firstName}', lastName = '${u.lastName}', password = ${u.password} WHERE id = ${u.id} RETURNING *`;
        const result = await conn.query(sql);
        const { rows } = result;
        const user = {
            id: rows[0].id,
            firstName: rows[0].firstName,
            lastName: rows[0].lastName,
            password: rows[0].password
          }
        conn.release();
        return user;
      } catch (err) {
        throw new Error(`Cannot update user with id ${u.id}. Error: ${err}`);
      }
  }

  async delete(id: number): Promise<User> {
      try {
        const conn = await client.connect();
        const sql = `DELETE FROM users WHERE id = ${id} RETURNING *`;
        const result = await conn.query(sql);
        const { rows } = result;
        const user = {
            id: rows[0].id,
            firstName: rows[0].firstName,
            lastName: rows[0].lastName,
            password: rows[0].password
          }
        conn.release();
        return user;
      } catch (err) {
        throw new Error(`Cannot delete user with id ${id}. Error: ${err}`);
      }
  }
};
