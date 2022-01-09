import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  HOST,
  DATABASE,
  DB_USER,
  DB_PASSWORD
} = process.env;

const client: Pool = new Pool({
  host: HOST,
  database: DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
});

export default client;