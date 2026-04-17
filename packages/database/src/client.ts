import { neon } from "@neondatabase/serverless";
import { instrumentDrizzleClient } from "@workspace/observability/database";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzlePg } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "./keys";
import { OtelLogger } from "./logger";
import { schema } from "./schema";

const isLocal =
  env.DATABASE_URL.includes("localhost") ||
  env.DATABASE_URL.includes("127.0.0.1");

const createDb = () => {
  const logger = new OtelLogger();

  if (isLocal) {
    const sql = postgres(env.DATABASE_URL);
    return drizzlePg({ client: sql, schema, logger });
  }

  const sql = neon(env.DATABASE_URL);
  return drizzleNeon({ client: sql, schema, logger });
};

export const db = instrumentDrizzleClient(createDb());
export * from "drizzle-orm";
