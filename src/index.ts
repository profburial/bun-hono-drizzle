import { Hono } from "hono";
import { logger } from "hono/logger";
import { HTTPException } from "hono/http-exception";
import authRoutes from "@app/routes/auth";

const app = new Hono({ strict: true });

const routes = app
  .use(logger())
  .get("/", (c) => {
    return c.json(
      {
        status: 418,
        error: "🖕",
      },
      418,
    );
  })
  .route("/auth", authRoutes)
  .notFound((c) => {
    return c.json(
      {
        status: 404,
        error: "Not found",
      },
      404,
    );
  })
  .onError(async (error, c) => {
    console.error(error, typeof error);

    if (error instanceof HTTPException) {
      const response = error.getResponse();
      return c.json(
        {
          status: response.status,
          error: error.message,
        },
        response.status as ResponseInit,
      );
    }

    return c.json({
      status: 500,
      error: "An unexpected error occurred",
    });
  });

export default {
  fetch: app.fetch,
};

export type AppType = typeof routes;
