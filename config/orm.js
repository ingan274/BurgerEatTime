// methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.
var connection = require('./connection');
// get home

// Helper function for SQL syntax.
// number/symbol to string, it determines length of objects to insert
function numToString(num) {
    var arr = [];

    for (var item of num) {
        arr.push("?");
    }
    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
    // loop through the keys and push the key/value as a string into arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }
    // translate array of strings to a single comma-separated string
    return arr.toString();
}

module.exports = {
    //get
    selectAll: function (table) {
        // create SQL search
        var sqlsearch = "SELECT * FROM " + table
        // Run query
        connection.query(sqlsearch, function (err, result) {
            if (err) {
                return res.status(500).end();
            }
        });
    },
    // post
    insertOne: function (table, column, value) {
        // create SQL search
        var sqlsearch = "INSERT INTO  " + table + " (" + column + ") VALUES (" + numToString(value.length) + ")"
        // Run query
        connection.query(sqlsearch, value, function (err, result) {
            if (err) {
                return res.status(500).end();
            }
        });
    },
    //put
    updateOne: function (table, updateColVal, condition) {
        // create SQL search
        var sqlsearch = "UPDATE  " + table + " SET " + objToSql(updateColVal) + " WHERE " + condition
        // Run query
        connection.query(sqlsearch, function (err, result) {
            if (err) {
                return res.status(500).end();
            }
            else if (result.changedRows === 0) {
                return res.status(404).end();
            }
        });
    }
    ,
}