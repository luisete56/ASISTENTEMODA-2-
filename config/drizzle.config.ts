import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./migrations",
      schema: "./02-database/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgresql://localhost:5432/temp",
  },
});
