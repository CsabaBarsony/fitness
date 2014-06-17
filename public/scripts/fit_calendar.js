"use strict";

fit.directive("fitCalendar", ["fitCalendarService", function(calendarService){
	return {
		restrict: "E",
		replace: true,
		templateUrl: "templates/fit_calendar.html",
		scope: {
			activity: "="
		},

		link: function(scope){
			scope.dayShortNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

			scope.$watch("activity", function(newActivity){
				scope.weeks = calendarService.getWeeksArray(newActivity.year, newActivity.month);
				scope.cells = new Array(scope.weeks.length * 7);
				var dayOffset = calendarService.getFirstDayOffset(newActivity.year, newActivity.month);

				for(var i = 0, l = scope.cells.length; i <= l; i++){
					scope.cells[i] = {
						day: calendarService.setDay(i, scope.activity.year, scope.activity.month),
						unit: scope.activity.unit,
						month: scope.activity.month,
						year: scope.activity.year,
						activity: scope.activity.name
					};
				}

				for(i = 0, l = newActivity.hits.length; i < l; i++){
					scope.cells[newActivity.hits[i].day + dayOffset].quantity = newActivity.hits[i].quantity;
				}
			});
		}
	};
}]);

fit.factory("fitCalendarService", function(){
	return {
		getFirstDayOffset: function(year, month){
			var firstDay = new Date(year, month - 1, 1);
			return convertDayNameToNumber(firstDay.toString().substring(0, 3));
		},
		getLastDayOffset: function(year, month){
			var lastDay = new Date(year, month, 0);
			return convertDayNameToNumber(lastDay.toString().substring(0, 3));
		},
		getWeeksArray: function(year, month){
			var result = [];
			var days = daysInMonth(year, month) + this.getFirstDayOffset(year, month);
			for(var i = 0, l = Math.ceil(days / 7); i < l; i++){
				result[i] = i + 1;
			}
			return result;
		},
		setDay: function(cell, year, month){
			var day = cell - this.getFirstDayOffset(year, month);
			if(day < 1 || day > daysInMonth(year, month)){
				return 0;
			}
			else {
				return day;
			}
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

	function daysInMonth(year, month){
		return new Date(year, month, 0).getDate();
	}
});

fit.directive("test", function(api){
	return {
		template: "<button ng-click='testApi()'>Test</button>",
		link: function(scope){
			scope.testApi = function(){
				api.testApi();
			};
		}
	}
});
