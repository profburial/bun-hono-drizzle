import { sql } from "drizzle-orm";
import { integer, pgTable, text, time, varchar } from "drizzle-orm/pg-core";
import { z } from "zod";

export const usersSchema = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
  email: varchar("email", { length: 256 }).unique().notNull(),
  password: text("password").notNull(),
  first_name: varchar("first_name", { length: 256 }).notNull(),
  last_name: varchar("last_name", { length: 256 }).notNull(),
  created_at: time("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const userSchema = z.object({
  id: z.number().optional(),
  email: z.string().email(),
  password: z.string().min(8),
  first_name: z.string(),
  last_name: z.string(),
  created_at: z.string().optional(),
});

export const userValidate = userSchema.omit({ id: true, created_at: true });

export type UserResponse = typeof usersSchema.$inferSelect;
export type UserParams = typeof usersSchema.$inferInsert;
export type UserField = keyof UserParams;
