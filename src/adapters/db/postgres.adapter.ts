import { Pool } from "pg";

const isCloudSQL = Boolean(process.env.INSTANCE_CONNECTION_NAME);

const pool = new Pool(
  process.env.DATABASE_URL
    ? { connectionString: process.env.DATABASE_URL }
    : {
        host: isCloudSQL ? `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}` : process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || "nyle_health_db",
        port: isCloudSQL ? undefined : Number(process.env.DB_PORT || 5432),
        ssl: !isCloudSQL && process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
      }
);

export async function query(text: string, params?: any[]) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log("[DB Query]", { text, duration, rows: res.rowCount });
  return res;
}

export { pool };
