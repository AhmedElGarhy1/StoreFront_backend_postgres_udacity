import { Pool } from "pg";

import dotenv from "dotenv";
dotenv.config();

const {
  PG_HOST,
  PG_PORT,
  PG_USER,
  PG_PASSWORD,
  PG_DATABASE,
  PG_TEST_DATABASE,
  ENV,
} = process.env;

let database = PG_DATABASE;
if (ENV === "test") {
  database = PG_TEST_DATABASE;
}

const pool: Pool = new Pool({
  port: +(PG_PORT || "5432"),
  user: PG_USER,
  password: PG_PASSWORD,
  database: database,
  host: PG_HOST,
});

export default pool;
