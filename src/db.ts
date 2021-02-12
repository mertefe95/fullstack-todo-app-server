const { Pool } = require("pg");
require("dotenv").config({
  path: `${__dirname}/../.env`,
});

const pool = new Pool({
  user: "postgres",
  password: LOCAL_DB_PASSWORD!,
  host: "localhost",
  port: 5432,
  database: "todoapp",
});

export default pool;
