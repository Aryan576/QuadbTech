const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "quadbtest",
  password: "root",
  port: 5432,
});


pool.connect()
module.exports=pool;