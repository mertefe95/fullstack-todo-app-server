const { Pool } = require('pg')
const pool = new Pool(
user: 'postgres',
  host: 'database.server.com',
  database: 'mert',
  password: 'Efemert9595',
  port: 5432,
)
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}