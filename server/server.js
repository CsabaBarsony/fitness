"use strict";

var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var db = require("mongojs").connect("mydb", ["users"]);
var tokenExpiration = 60000;

app.use(bodyParser.json());

app.post("/api/register", function(req, res){
	db.users.find({ username: req.body.username }, function(error, user){
		if(error) {
			res.send(500);
		}
		else if(user.length > 0) {
			console.log(user);
			res.send(400);
		}
		else {
			db.users.save({ username: req.body.username, password: req.body.password });
			res.send(200);
		}
	});
});

app.post("/api/login", function(req, res){
	db.users.find({ username: req.body.username, password: req.body.password }, function(error, users){
		if(error){
			res.send(500);
		}
		else if(users.length > 0){
			var token = generateToken(10);
			var updateData = {
				token: token,
				timestamp: Date.now() + tokenExpiration
			};
			db.users.update({ username: req.body.username }, { $set: updateData }, function(error, updated){
				if(error || !updated) console.log(error);
				else {
					res.send({ token: token });
				}
			});
		}
		else{
			res.send(401);
		}
	});
});

app.get('/users', function(req, res) {
	db.users.find({}, function(error, users){
		if(error || !users) console.log(error);
		else {
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
	res.send(200);
});

app.get("/data", function(req, res){
	authorize(req.query.username, req.query.token, function(){
		res.send("top secret data");
	});
});

function generateToken(length)
{
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for( var i=0; i < length; i++ )
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

function authorize(username, token, callback){
	db.users.find({ username: username, token: token }, { timestamp: 1 }, function(error, users){
		if(error){
			console.log("1: " + error);
		}

		console.log(users);

		if(users.length > 0 && users[0].timestamp > Date.now()){
			db.users.update({ username: username }, { $set: { timestamp: (Date.now() + tokenExpiration) } }, function(error, users){
				if(error){
					console.log("2: " + error);
				}
				else {
					callback();
				}
			});
		}
		else {
			console.log("3: " + error);
		}
	});
}

app.use(express.static(path.join(__dirname, "../public")));

app.listen(8000);
