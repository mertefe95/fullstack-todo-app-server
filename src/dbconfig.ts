const config = {
  user: 'MertAdmin',
  password: 'Admin12345',
  server: 'MERT\\MSSQLSERVER01',
  database: 'Blog',
  options: {
    trustedConnection: true,
    enableArithAort: true,
    parseJSON:true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
}
}

export default config