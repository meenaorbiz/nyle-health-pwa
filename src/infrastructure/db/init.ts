import fs from "fs";
import path from "path";
import { query } from "@/adapters/db/postgres.adapter";

export async function initDatabase() {
  try {
    const schemaPath = path.join(process.cwd(), "src/infrastructure/db/schema.sql");
    const sql = fs.readFileSync(schemaPath, "utf8");
    await query(sql);
    console.log("Postgres database tables initialized successfully.");
  } catch (err: any) {
    console.error("Failed to initialize database schema:", err.message);
  }
}
