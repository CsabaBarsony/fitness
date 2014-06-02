"use strict";

fit.directive("calendar", ["calendarService", function(calendarService){
	return {
		restrict: "E",

		replace: true,

		templateUrl: "templates/fit_calendar.html",

		scope: {
			selectedMonth: "="
		},

		link: function(scope){
			scope.calendar = {
				dayShortNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

				clickOnDay: function(day){
					console.log(scope.selectedMonth);
				}
			};
		}
	};
}]);
