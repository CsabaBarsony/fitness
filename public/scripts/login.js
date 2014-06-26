"use strict";

var log = angular.module("login", []);

log.controller("LoginController", ["$scope", "$http", function(scope, http){
	scope.username = "";

	scope.password = "";

	scope.submit = function(){
		if(scope.username && scope.password){
			http({ method: "POST", url: "/api/login", data: { username: scope.username, password: scope.password } }).
				success(function(data){
					console.log("Success! " + data);
				}).
				error(function(data){
					console.log("Ajax error: " + data);
				});
		}
		else {
			alert("Wrong username and/or password!");
		}
	};
}]);
