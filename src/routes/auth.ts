import { Hono } from "hono";
import { authenticate, register, token } from "@app/lib/auth";
import { userValidate, loginValidate } from "@app/db/schema";
import { validate } from "@app/lib/util/validate";

const authRoutes = new Hono()
  .post("/login", async (c) => {
    const input = await validate(c, loginValidate);
    const user = await authenticate(input);

    return c.json({
      token: await token(user.id),
    });
  })
  .post("/register", async (c) => {
    const input = await validate(c, userValidate);
    const user = await register(input);

    return c.json({
      token: await token(user.id),
    });
  });

export default authRoutes;
