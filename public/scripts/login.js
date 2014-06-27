"use strict";

var log = angular.module("login", []);

log.controller("LoginController", ["$scope", "$http", "$window", function(scope, http, window){
	scope.error = "";

	var redirectReason = sessionStorage.getItem("redirectReason");

	if(redirectReason === "0"){
		scope.error = "You must be logged in.";
		sessionStorage.setItem("redirectReason", "");
	}

	scope.submit = function(){
		var username = document.getElementById("username").value;
		var password = document.getElementById("password").value;

		if(username && password){
			http({ method: "POST", url: "/api/login", data: { username: username, password: password } }).
				success(function(data){
					sessionStorage.setItem("token", data.token);
					window.location.href = "/";
				}).
				error(function(data){
					scope.error = "Wrong username or password.";
					console.log("Ajax error: " + data);
				});
		}
		else {
			alert("Missing username and/or password!");
		}
	};
}]);
