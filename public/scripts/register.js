"use strict";

var reg = angular.module("register", []);

reg.controller("RegisterController", ["$scope", "$http", function(scope, http){
	scope.username = "";

	scope.password = "";

	scope.submit = function(){
		if(scope.username && scope.password){
			http({ method: "POST", url: "/api/register", data: { username: scope.username, password: scope.password } }).
				success(function(data){
					console.log("Success!");
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
