"use strict";

fit.controller("FitController", ["$scope", "api", function(scope, api){
	scope.activities = api.readActivities();

	scope.selectedActivity = scope.activities[0];

	scope.months = [
		{ id: 1, name: "Jan" },
		{ id: 2, name: "Feb" },
		{ id: 3, name: "Mar" },
		{ id: 4, name: "Apr" },
		{ id: 5, name: "May" },
		{ id: 6, name: "Jun" },
		{ id: 7, name: "Jul" },
		{ id: 8, name: "Aug" },
		{ id: 9, name: "Sep" },
		{ id: 10, name: "Oct" },
		{ id: 11, name: "Nov" },
		{ id: 12, name: "Dec" }
	];

	scope.selectedMonth = scope.months[4];

	scope.years = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];

	scope.selectedYear = scope.years[0];

	scope.optionsChange = function(){
		refreshActivity();
	};

	scope.$on("cellChanged", function(){
		refreshActivity();
	});

	function refreshActivity(){
		scope.activity = api.readActivity(scope.selectedActivity, scope.selectedYear, scope.selectedMonth.id);
	}

	refreshActivity();
}]);
