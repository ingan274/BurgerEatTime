var burger = require('../models/burger');

var all = burger.getAll;
var insert = burger.insertNew;
var update = burger.updatePrev;

var express = require("express");
var router = express.Router();

// get all
router.get("/", function (req, res) {
    burger.getAll(function (data) {
        var object = {
            burgers: data
        }
        console.log(object)
        res.render("index", object);
    })
});

// get api burgers
router.get("/api/burgers", function (req, res) {
    all(function (data) {
        res.json(data);
    });
});


// post = insert
router.post("/api/burgers", function (req, res) {
    burgerName = req.body.burger_name
    console.log(burgerName)
    insert(burgerName, function (result) {
        // res.json({ id: result.insertId });
        res.redirect('/');
    });
   
});



// put = update
router.put("/api/burgers/:id", function (req, res) {
    var burgerId = req.params.id;
    var condition = "burger_id = " + burgerId;
    console.log("condition", condition);

    update({
        devoured: req.body.devoured
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router




