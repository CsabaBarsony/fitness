"use strict";

fit.directive("calendar", function(){
	return {
		restrict: "E",
		replace: true,
		templateUrl: "templates/fit_calendar.html",
		link: function(scope){
			scope.calendar = {
				dayShortNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
			};
			scope.clickOnDay = function(day){
				console.log("day: " + day);
			};
		}
	};

	function firstDay(){
		// ToDo
	}

	function lastDay(){
		// ToDo
	}
});
