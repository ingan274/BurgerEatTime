// code to connect Node to MySQL
var mysql = require("mysql2");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "burgers_db"
});

module.exports = connection;