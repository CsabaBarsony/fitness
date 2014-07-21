"use strict";

var app = angular.module("sm", []);

app.controller("MainController", function($scope){
	$scope.sm = StateMachine.create({
		initial: "working",
		events: [
			{ name: "bored", from: "working", to: "coffee" },
			{ name: "breakOver", from: "coffee", to: "working" },
			{ name: "callForMeeting", from: ["working", "coffee"], to: "meeting" },
			{ name: "endMeeting", from: "meeting", to: "working" }
		],
		callbacks: {
			onworking: function(){
				$scope.working = true;
			},
			onleaveworking: function(){
				$scope.working = false;
			},

			oncoffee: function(){
				$scope.coffee = true;
			},
			onleavecoffee: function(){
				$scope.coffee = false;
			},

			onmeeting: function(){
				$scope.meeting = true;
			},
			onleavemeeting: function(){
				$scope.meeting = false;
			}
		}
	});
});