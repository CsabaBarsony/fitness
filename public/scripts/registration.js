"use strict";

var reg = angular.module("registration", []);

reg.controller("RegistrationController", ["$scope", "$http", "$window", function(scope, http, window){
	scope.username = "";

	scope.password = "";

	scope.submit = function(){
		if(scope.username && scope.password){
			http({ method: "POST", url: "/api/registration", data: { username: scope.username, password: scope.password } }).
				success(function(data){
					sessionStorage.setItem("token", data.token);
					window.location.href = "/";
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
