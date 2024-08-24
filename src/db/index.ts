import * as schema from "@app/db/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  host: Bun.env.DB_HOST || "localhost",
  port: Number(Bun.env.DB_PORT) || 5432,
  database: Bun.env.DB_DATABASE || "buntest",
  user: Bun.env.DB_USER || "postgres",
  password: Bun.env.DB_PASSWORD || "password",
  ssl: false,
});

export const db = drizzle(pool, { schema });
