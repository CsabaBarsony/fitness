"use strict";

var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var db = require("mongojs").connect("mydb", ["users"]);
var crypto = require("crypto");
var key = "n1wkIGv7I89FzotJYEsaY0pdTOty8jyD1tQN3siK";
var salt = "mC96BZ5wFz5XYIqJnKwnIdqVD2fBZE5AS5gh4GEV";

var tokenExpiration = 600000;
var tokenLength = 40;
var portNumber = 8000;
var tokenHeader = "x-auth-token";

app.use(bodyParser.json());

app.post("/api/registration", function(req, res){
	db.users.find({ username: req.body.username }, function(error, user){
		if(error) {
			res.send(500);
		}
		else if(user.length > 0) {
			console.log(user);
			res.send(400);
		}
		else {
			var token = generateToken();
			var passwordHash = crypto.createHmac("sha256", key).update(req.body.password + salt).digest("hex");
			db.users.save({
				username: req.body.username,
				password: passwordHash,
				token: token,
				tokenExpiration: Date.now() + tokenExpiration,
				activities: []
			});
			res.send({ token: token });
		}
	});
});

app.post("/api/login", function(req, res){
	var passwordHash = crypto.createHmac("sha256", key).update(req.body.password + salt).digest("hex");
	db.users.find({ username: req.body.username, password: passwordHash }, function(error, users){
		if(error){
			res.send(500);
		}
		else if(users.length > 0){
			var token = generateToken();
			var updateData = {
				token: token,
				tokenExpiration: Date.now() + tokenExpiration
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

app.get("/api/authorize", function(req, res){
	authorize(req.headers[tokenHeader], function(){
		res.send(200);
	}, function(){
		res.send(401);
	});
});

app.get("/api/logout", function(req, res){
	authorize(req.headers[tokenHeader], function(){
		db.users.update({ token: req.headers[tokenHeader] }, { $set: { tokenExpiration: 0 } }, function(error, users){
			if(error){
				console.log("DB Error - users.update() " + error);
			}
			else {
				console.log("User logged out.");
				res.send({ logoutSuccess: "1"});
			}
		});
	}, function(){
		res.send(401);
	});
});

app.get("/api/read_activities", function(req, res){
	db.users.find({ token: req.headers[tokenHeader] }, { activities: 1 }, function(error, users){
		if(error){
			console.log(error);
		}
		else {
			var result = [];
			for(var i = 0, l = users[0].activities.length; i < l; i++){
				result.push(users[0].activities[i].name);
			}
			res.send(result);
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

app.get("/data", function(req, res){
	authorize(req.headers[tokenHeader], function(username){
		res.send("top secret data: " + username);
	}, function(){
		res.send(401);
	});
});

function generateToken()
{
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for(var i = 0; i < tokenLength; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

function authorize(token, success, fail){
	db.users.find({ token: token }, { tokenExpiration: 1, username: 1 }, function(error, users){
		if(error){
			console.log("DB Error - users.find(): " + error);
		}

		if(users.length > 0 && users[0].tokenExpiration > Date.now()){
			var user = users[0];
			db.users.update({ token: token }, { $set: { tokenExpiration: (Date.now() + tokenExpiration) } }, function(error, users){
				if(error){
					console.log("DB Error - users.update() " + error);
				}
				else {
					success(user.username);
				}
			});
		}
		else {
			console.log("Authorization failed");
			fail();
		}
	});
}

/*db.users.update({ username: "csati" }, { $set: { activities: [
	{
		name: "Running",
		unit: "m",
		hits: [
			{ date: "2014-06-27", quantity: 1000 },
			{ date: "2014-06-28", quantity: 1500 }
		]
	}
] }});*/

app.use(express.static(path.join(__dirname, "../public")));

app.listen(portNumber);
