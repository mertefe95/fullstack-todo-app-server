const { Pool } = require("pg");

const connectString =
  "postgres://fpgtqhtuaxmsyc:7668498760361d2363e2e21d7bead6c5e3b5d378963bbc0aa74f1cb032a6c1b7@ec2-52-6-178-202.compute-1.amazonaws.com:5432/dceniu2kram4t3";
const pool = new Pool({
  connectionString: connectString,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
