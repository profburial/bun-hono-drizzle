import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema/index.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_DATABASE || "buntest",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "bonnie rules",
    ssl: false,
  },
});
