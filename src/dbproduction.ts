const { Pool } = require("pg");
require("dotenv").config({
  path: `${__dirname}/../.env`,
});

const connectString = process.env.DATABASE_URL!;
const pool = new Pool({
  connectionString: connectString,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
