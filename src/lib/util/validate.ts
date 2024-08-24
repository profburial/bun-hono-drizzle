import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";
import { errorMessage } from "@app/lib/util/error";

export async function validate<T extends z.ZodTypeAny>(
  c: Context,
  validator: T,
): Promise<z.infer<T>> {
  const input = await validator.safeParseAsync(await c.req.json());

  if (!input.success) {
    throw new HTTPException(422, {
      message: errorMessage(input.error),
    });
  }

  return input.data;
}
