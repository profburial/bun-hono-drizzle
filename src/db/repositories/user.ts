import { eq } from "drizzle-orm";
import { db } from "@app/db";
import { type UserParams, usersSchema } from "@app/db/schema";

export async function getAllUsers() {
  const users = db.query.usersSchema.findMany();
  return await users.execute();
}

export async function getUserByEmail(email: string) {
  return await db.query.usersSchema.findFirst({
    where: eq(usersSchema.email, email),
  });
}

export async function createUser(user: UserParams) {
  return await db.insert(usersSchema).values(user).returning();
}

export async function updateUser(user: Partial<UserParams>, id: number) {
  return await db
    .update(usersSchema)
    .set(user)
    .where(eq(usersSchema.id, id))
    .returning();
}

export async function deleteUser(id: number) {
  const user = await db
    .delete(usersSchema)
    .where(eq(usersSchema.id, id))
    .returning();

  return user.length === 1;
}
