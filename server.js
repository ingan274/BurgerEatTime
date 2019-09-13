var orm = require('./config/orm');
var selectAll = orm.selectAll;
var insertOne = orm.insertOne;
var updateOne = orm.updateOne;

var express = require("express");
var exphbs = require("express-handlebars");
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app use style sheets
app.use(express.static('public'))

// connect to handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// ORM calls
require('./config/orm')(app)

// listen
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
  