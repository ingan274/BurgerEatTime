// call the ORM functions using burger specific input for the ORM
var orm = require('../config/orm');
var selectAll = orm.selectAll;
var insertOne = orm.insertOne;
var updateOne = orm.updateOne;

module.exports = {
    getAll: function () {
        selectAll("burgers")
    },
    insertNew: function (name) {
        insertOne("burgers", "burger_name", name)
    },
    updatePrev: function (objColVals, condition) {
        updateOne("burgers", objColVals, condition)
    },
}

