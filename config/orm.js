// methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.
var connection = require('./connection');
module.exports = function (app) {
    // get home
    app.get("/", function (req, res) {
        connection.query("SELECT * FROM burgers;", function (err, data) {
            if (err) {
                return res.status(500).end();
            }
            res.render("index", { burgers: data });
        });
    });

    // get api burgers
    app.get("/api/burgers", function(req, res) {
        connection.query("SELECT * FROM burgers;", function(err, data) {
          if (err) {
            return res.status(500).end();
          }
      
          res.json(data);
        });
      });

    // post
    app.post("/api/burgers", function (req, res) {
        connection.query("INSERT INTO burgers (burger_name) VALUES (?)", [req.body.burger], function (err, result) {
            if (err) {
                return res.status(500).end();
            }

            // Send back the ID of the new burger
            res.json({ id: result.insertId });
            console.log({ id: result.insertId });
        });
    });

    // put
    app.put("/api/burgers/:id", function (req, res) {
        connection.query("UPDATE plans SET burger_name = ? WHERE id = ?", [req.body.burgerUpdate, req.params.id], function (err, result) {
            if (err) {
                return res.status(500).end();
            }
            else if (result.changedRows === 0) {
                return res.status(404).end();
            }
            res.status(200).end();
        });
    });
}