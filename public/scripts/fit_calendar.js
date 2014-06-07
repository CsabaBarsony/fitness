"use strict";

fit.directive("calendar", ["calendarService", function(calendarService){
	return {
		restrict: "E",
		replace: true,
		templateUrl: "templates/fit_calendar.html",
		scope: {
			activity: "="
		},

		link: function(scope){
			scope.calendar = {
				cells: new Array(42),
				dayShortNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
				clickOnDay: function(day){
					console.log(scope.activity);
					return scope.activity;
				}
			};

			scope.majom = function(){
				return "majom";
			};

			/*for(var i = 0, l = scope.calendar.cells.length; i < l; i++){
				scope.calendar.cells[i] = {
					day: i
				};
			}

			scope.$watch("activity", function(newActivity){
				for(var i = 0, l = scope.calendar.cells.length; i < l; i++){
					scope.calendar.cells[i].hit = null;
				}
				var dayShift = calendarService.getFirstDay();
				for(var i = 0, l = newActivity.hits.length; i < l; i++){
					scope.calendar.cells[newActivity.hits[i].day + dayShift].hit = newActivity.hits[i].quantity + scope.activity.unit;
				}
			});*/
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
