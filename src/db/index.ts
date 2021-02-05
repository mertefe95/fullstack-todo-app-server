const { Pool } = require('pg')
const pool = new Pool(
user: 'postgres',
  host: 'database.server.com',
  database: 'mert',
  password: 'Efemert9595',
  port: 5432,
)
module.exports = {
  query: (text: any, params: any, callback: any) => {
    return pool.query(text, params, callback)
  },
}