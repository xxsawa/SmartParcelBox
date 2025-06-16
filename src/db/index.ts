import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // or hardcode your connection string
  // optionally add more config like ssl, max clients, idle timeout, etc.
});

export default pool;
