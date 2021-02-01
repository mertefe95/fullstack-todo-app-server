const config = {
  user: 'MertAdmin',
  password: 'Admin12345',
  server: '127.0.0.1',
  database: 'Blog',
  options: {
    trustedConnection: true,
    enableArithAort: true,
    instanceName: `MSSQLSERVER01`,
    parseJSON:true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
}
}

export default config