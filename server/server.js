"use strict";

var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var db = require("mongojs").connect("mydb", ["users"]);

app.use(bodyParser.json());

app.get('/users', function(req, res) {
	db.users.find({ name: "Csati" }, function(err, users){
		if(err || !users){
			console.log("Error: " + err);
		}
		else {
			res.type('application/json');
			res.send(users);
		}
	});
});

app.post("/users", function(req, res){
	db.users.save({ name: req.body.name }, function(err, saved){
		if(err || !saved){
			console.log(err);
			console.log("Not saved");
		}
		else {
			console.log("User saved");
		}
	});
	res.send("200");
});

app.use(express.static(path.join(__dirname, "../public")));

app.listen(8000);
