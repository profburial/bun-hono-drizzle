import { JWTPayload } from "hono/utils/jwt/types";
import { createUser, getUserByEmail } from "@app/db/repositories";
import { UserParams, UserResponse } from "@app/db/schema";
import { sign, verify } from "hono/jwt";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

type UserAuth = Pick<UserParams, "email" | "password">;
type TokenResponse = JWTPayload & {
  sub: number;
  role: "user" | "admin";
};

export async function register(params: UserParams): Promise<UserResponse> {
  const password = await Bun.password.hash(params.password, {
    algorithm: "bcrypt",
    cost: 4,
  });

  const newUser = await createUser({
    email: params.email,
    password: password,
    first_name: params.first_name,
    last_name: params.last_name,
  });

  return newUser[0];
}

export async function authenticate(params: UserAuth): Promise<UserResponse> {
  const existingUser = await getUserByEmail(params.email);
  if (!existingUser) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  const isMatch = await Bun.password.verify(
    params.password,
    existingUser.password,
  );

  if (!isMatch) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  return existingUser;
}

export async function token(userId: number): Promise<string> {
  const payload: JWTPayload = {
    sub: userId,
    role: "user",
    exp: Math.floor(Date.now() / 1000) + 60 * 120,
  };

  return await sign(payload, String(Bun.env.JWT_SECRET));
}

export async function verifyToken(authHeader: string): Promise<JWTPayload> {
  const token = authHeader.split(" ")[1];
  return await verify(token, String(Bun.env.JWT_SECRET));
}

export function getToken(c: Context): TokenResponse {
  return c.get("jwtPayload");
}
