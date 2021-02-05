const { Pool }  = require('pg');

const pool = new Pool({
  user: "postgres",
  password: "Efemert9595",
  host: "localhost",
  port: 5432,
  database: "todoapp"
})

export default pool;