const mysql = require("mysql2");
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Zarakifan13",
    database: "track_my_workforce_db",
  },
  console.log("\n You are now connected to the Workforce Database.\n")
);

module.exports = db;
