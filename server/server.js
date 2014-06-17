"use strict";

var express = require("express");
var app = express();
var path = require("path");
var mysql = require("mysql");
var conn = mysql.createConnection({
	host: "localhost",

})

app.get('/test', function(req, res) {
	res.type('application/json');
	res.send("test data...");
});

app.use(express.static(path.join(__dirname, "../public")));

app.listen(8000);
