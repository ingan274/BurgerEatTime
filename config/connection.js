// code to connect Node to MySQL
var mysql = require("mysql2");

if (process.env.JAWSDB_URL) {
  var connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "burgers_db"
  });
}

// connection.query("SHOW TABLES", function(err,results){
//   if (results.length === 0) {
//     connection.query("CREATE DATABASE burgers_db; USE burgers_db; CREATE TABLE burgers (burger_id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY, burger_name VARCHAR (50) NOT NULL, devoured BOOLEAN DEFAULT false NOT NULL);")
//   };
// })
module.exports = connection;