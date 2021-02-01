const config = {
  user: 'MertAdmin',
  password: 'Admin12345',
  server: 'https://cryptic-harbor-96739.herokuapp.com/',
  database: 'Blog',
  options: {
    trustedConnection: true,
    enableArithAort: true,
    instanceName: `MSSQLSERVER01`,
    parseJSON:true
  }
}

export default config