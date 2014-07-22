"use strict";

var app = angular.module("sm", []);

app.controller("MainController", function($scope, $timeout){
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
				$scope.message = "leaving working...";
				$timeout(function(){
					$scope.message = null;
					$scope.working = false;
					$scope.sm.transition();
				}, 2000);
				return StateMachine.ASYNC;
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

	$scope.message = null;
});