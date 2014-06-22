"use strict";

var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get('/users', function(req, res) {
	console.log("users get");
	res.type('application/json');
	res.send("test data majom...");
});

app.post("/users", function(req, res){
	console.log(req.body.name);
	res.send("200");
});

app.use(express.static(path.join(__dirname, "../public")));

app.listen(8000);
