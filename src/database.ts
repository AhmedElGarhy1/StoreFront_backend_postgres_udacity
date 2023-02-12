import { Pool } from "pg";

import dotenv from "dotenv";
dotenv.config();

const { PG_USER, PG_DATABASE, PG_TEST_DATABASE, PG_PASSWORD, PG_HOST, ENV } =
  process.env;

let database = PG_DATABASE;

if (ENV === "test") {
  database = PG_TEST_DATABASE;
}

const pool: Pool = new Pool({
  user: PG_USER,
  password: PG_PASSWORD,
  database: database,
  host: PG_HOST,
});

export default pool;
