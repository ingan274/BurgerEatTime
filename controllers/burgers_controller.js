var burger = require('../models/burger');

module.exports = function (app) {
    var all = burger.getAll;
    var insert = burger.insertNew;
    var update = burger.updatePrev;

    // get all
    app.get("/", function (req, res) {
        burger.getAll(function(data){
            var object = {
                burgers: data
            }
            console.log(object)
            res.render("index", object);
        })
    });

    // get api burgers
    app.get("/api/burgers", function (req, res) {
        all(function (data) {
            res.json(data);
        });
    });


    // post = insert
    app.post("/api/burgers", function (req, res) {
        burgerName = req.body.addBurger
        insert(burgerName, function (result) {
            res.redirect('/');
            res.json({ id: result.insertId });
        });
    });



    // put = update
    app.put("/api/burgers/:id", function (req, res) {
        var burgerId = req.params.id;
        var condition = "id = " + burgerId;
        console.log("condition", condition);

        update({
            devoured: 1
        }, condition, function (result) {
            if (result.changedRows == 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
            } else {
                res.redirect('/');
                // res.status(200).end();
            }
        });
    });
}




