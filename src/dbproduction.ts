const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "7668498760361d2363e2e21d7bead6c5e3b5d378963bbc0aa74f1cb032a6c1b7",
  host: "ec2-52-6-178-202.compute-1.amazonaws.com",
  port: 5432,
  database: "dceniu2kram4t3",
});

export default pool;
