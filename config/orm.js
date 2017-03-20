// Dependencies
// =============================================================
var connection = require("./connection.js");

// ORM
// =============================================================

// Helper function for SQL syntax.
function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    if (Object.hasOwnProperty.call(ob, key)) {
      arr.push(key + "=" + ob[key]);
    }
  }

  return arr.toString();
}
// var tableName = "burgers";

var orm = {

  // Here our ORM is creating a simple method for performing a query of the entire table.
  // We make use of the callback to ensure that data is returned only once the query is done.
  selectAll: function (tableName, callback) {
    var queryString = `SELECT * FROM ${tableName}`;
    connection.query(queryString, function (err, result) {
      callback(result);
    });
  },

  insertOne: function (tableName, cols, vals, callback) {
    var queryString = `INSERT INTO ${tableName} (${cols.toString()}) VALUES (?,?)`;
    console.log(queryString)
    connection.query(queryString, vals, function (err, result) {
      callback(result);
    });
  },

  updateOne: function (tableName, objColVal, condition, callback) {
    var queryString = `UPDATE ${tableName} SET ${objToSql(objColVal)} WHERE id=${condition}`;
    connection.query(queryString, function (err, result) {
      callback(result);
    });
  }
};

module.exports = orm;