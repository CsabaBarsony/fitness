"use strict";

var app = angular.module("sm", []);

app.controller("MainController", function($scope){
	$scope.main = {};
	$scope.$on("main.colorChange", function(event, data){
		$scope.color = data;
	});
	$scope.$watch("main.display", function(newValue){
		$scope.wordsShow = newValue === "words";
	});
	$scope.$on("main.wordChange", function(event, word){
		$scope.word = word;
	});
});

app.directive("menu", function(){
	return {
		templateUrl: "templates/menu.html",
		scope: {
			main: "="
		},
		link: function(scope){
			scope.smm = StateMachine.create({
				initial: "lights",
				events: [
					{ name: "lightsClick", from: ["lights", "words"], to: "lights" },
					{ name: "wordsClick", from: ["lights", "words"], to: "words"}
				],
				callbacks: {
					onlights: function(){
						scope.main.display = "lights";
					},
					onwords: function(){
						scope.main.display = "words";
					}
				}
			});
		}
	};
});

app.directive("lights", function(){
	return {
		templateUrl: "templates/lights.html",
		scope: {
			main: "="
		},
		link: function(scope){
			scope.sml = StateMachine.create({
				initial: "yellow",
				events: [
					{ name: "greenClick", from: "yellow", to: "green" },
					{ name: "yellowClick", from: ["green", "red"], to: "yellow" },
					{ name: "redClick", from: "yellow", to: "red" }
				],
				callbacks: {
					ongreen: function(){
						scope.color = "green";
						scope.$emit("main.colorChange", "green");
					},
					onyellow: function(){
						scope.color = "yellow";
						scope.$emit("main.colorChange", "yellow");
					},
					onred: function(){
						scope.color = "red";
						scope.$emit("main.colorChange", "red");
					}
				}
			});
		}
	};
});

app.directive("words", function(){
	return {
		templateUrl: "templates/words.html",
		scope: {
			main: "="
		},
		link: function(scope){
			scope.smw = StateMachine.create({
				initial: "one",
				events: [
					{ name: "oneClick", from: "three", to: "one" },
					{ name: "twoClick", from: "one", to: "two" },
					{ name: "threeClick", from: "two", to: "three" }
				],
				callbacks: {
					onone: function(){
						scope.word = "one";
						scope.$emit("main.wordChange", "one");
					},
					ontwo: function(){
						scope.word = "two";
						scope.$emit("main.wordChange", "two");
					},
					onthree: function(){
						scope.word = "three";
						scope.$emit("main.wordChange", "three");
					}
				}
			});
		}
	};
});