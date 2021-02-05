const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL

const pool = new Pool({
  connectionString,
  ssl: true
});

export default pool;
