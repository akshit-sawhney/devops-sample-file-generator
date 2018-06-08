var fs = require('fs'),
    readline = require('readline'),
    stream = require('stream');

    const _ = require('lodash');

var mysql = require('mysql');

var instream = fs.createReadStream('./log/2018-06-08-results.log');
var outstream = new stream;
outstream.readable = true;
outstream.writable = true;

var rl = readline.createInterface({
    input: instream,
    output: outstream,
    terminal: false
});
let statusArray = {};
rl.on('line', function(line) {
    let individualLine = JSON.parse(line);
    if(statusArray[individualLine.action]) {
        statusArray[individualLine.action] += 1;
    } else {
        statusArray[individualLine.action] = 1;
    }
});

rl.on('close', function() {
    var con = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "root"
      });
      
      con.connect(function(err) {
        if (err) {
            console.log(err);
            throw err;
        }
        con.query("CREATE DATABASE testingDB", function (err, result) {
            if (err) throw err;
            console.log("Database created");
          });
        var sql1 = "CREATE TABLE testingDB.api_group (name VARCHAR(255), count INTEGER)";
        con.query(sql1, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });
        var sql = "INSERT INTO testingDB.api_group (name, count) VALUES ";
        _.forOwn(statusArray, function(value, key) {
            sql+= `('${key}',${value}),`;
        });
        sql = sql.substring(0, sql.length - 1);
        sql += `;` 
        con.query(sql, function (err, result) {
            if (err) throw err;
        });
      });
})
