"use strict";

fit.directive("calendar", ["calendarService", function(calendarService){
	return {
		restrict: "E",

		replace: true,

		templateUrl: "templates/fit_calendar.html",

		scope: {
			month: "="
		},

		link: function(scope){
			scope.calendar = {
				dayShortNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

				clickOnDay: function(day){
					console.log(scope.month);
				}
			};
		}
	};
}]);

fit.factory("calendarService", function(){
	return {
		getFirstDay: function(year, month){
			var firstDay = new Date(year, month, 1);

			return convertDayNameToNumber(firstDay.toString().substring(0, 3));
		},
		getLastDay: function(year, month){
			var lastDay = new Date(year, month + 1, 0);

			return convertDayNameToNumber(lastDay.toString().substring(0, 3));
		}
	};

	function convertDayNameToNumber(day){
		if(day === "Mon"){
			return 0;
		}
		else if(day === "Tue"){
			return 1;
		}
		else if(day === "Wed"){
			return 2;
		}
		else if(day === "Thu"){
			return 3;
		}
		else if(day === "Fri"){
			return 4;
		}
		else if(day === "Sat"){
			return 5;
		}
		else{
			return 6;
		}
	}
});
