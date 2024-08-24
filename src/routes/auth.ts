import { Hono } from "hono";
import { authenticate, register, token } from "@app/lib/auth";
import { userValidate } from "@app/db/schema";
import { HTTPException } from "hono/http-exception";
import { errorMessage } from "@app/lib/util/error";

const authRoutes = new Hono()
  .post("/login", async (c) => {
    const input = userValidate
      .pick({ email: true, password: true })
      .safeParse(await c.req.json());

    if (input.error) {
      throw new HTTPException(422, {
        message: errorMessage(input.error),
      });
    }

    const user = await authenticate(input.data);

    return c.json({
      token: await token(user.id),
    });
  })
  .post("/register", async (c) => {
    const input = userValidate.safeParse(await c.req.json());

    if (input.error) {
      throw new HTTPException(422, {
        message: errorMessage(input.error),
      });
    }

    const user = await register(input.data);

    return c.json({
      token: await token(user.id),
    });
  });

export default authRoutes;
