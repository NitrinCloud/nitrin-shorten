import type { Config } from "drizzle-kit";

export default {
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    host: process.env["DATABASE_HOST"] as string,
    database: process.env["DATABASE_NAME"] as string,
    user: process.env["DATABASE_USERNAME"] as string,
    password: process.env["DATABASE_PASSWORD"] as string,
  },
  driver: "mysql2",
} satisfies Config;
