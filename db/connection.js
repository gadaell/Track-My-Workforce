const mysql = require("mysql2");
require("dotenv").config();

//Connection Properties to the database
const connectionProperties = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
});

connectionProperties.connect((err) => {
  if (err) throw err;

  //Start menu main function once initiated
  console.log("\n You are now connected to the Workforce Database.\n");
});

module.exports = connectionProperties;
