import { pool } from "./config/db";

async function alter() {
  const client = await pool.connect();
  try {
    await client.query("ALTER TABLE public.salons ADD COLUMN IF NOT EXISTS video TEXT;");
    console.log("Column added");
  } catch(e) {
    console.error(e);
  } finally {
    client.release();
    pool.end();
  }
}
alter();
