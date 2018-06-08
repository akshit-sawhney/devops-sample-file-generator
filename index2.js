var fs = require('fs'),
    readline = require('readline'),
    stream = require('stream');

var instream = fs.createReadStream('./log/2018-06-08-results.log');
var outstream = new stream;
outstream.readable = true;
outstream.writable = true;

var rl = readline.createInterface({
    input: instream,
    output: outstream,
    terminal: false
});
let statusArray = new Array();
rl.on('line', function(line) {
    let individualLine = JSON.parse(line);
    if(statusArray[individualLine.action]) {
        statusArray[individualLine.action] += 1;
    } else {
        statusArray[individualLine.action] = 1;
    }
    console.log("HERE WE ARE: ", statusArray);
});
