const mysql = require("mysql2");
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
  },
  console.log("\n You are now connected to the Workforce Database.\n")
);

module.exports = db;
