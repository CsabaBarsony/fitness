"use strict";

fit.controller("FitController", ["$scope", "api", function(scope, api){
	scope.activities = api.getActivities();

	scope.selectedActivity = scope.activities[0];

	scope.months = [
		{ id: 0, name: "Jan" },
		{ id: 1, name: "Feb" },
		{ id: 2, name: "Mar" },
		{ id: 3, name: "Apr" },
		{ id: 4, name: "May" },
		{ id: 5, name: "Jun" },
		{ id: 6, name: "Jul" },
		{ id: 7, name: "Aug" },
		{ id: 8, name: "Sep" },
		{ id: 9, name: "Oct" },
		{ id: 10, name: "Nov" },
		{ id: 11, name: "Dec" }
	];

	scope.selectedMonth = scope.months[5];

	scope.activity = api.getActivity(scope.selectedActivity.id, scope.selectedMonth.id);

	scope.changeActivityOrMonth = function(){
		scope.activity = api.getActivity(scope.selectedActivity.id, scope.selectedMonth.id);
	};
}]);
