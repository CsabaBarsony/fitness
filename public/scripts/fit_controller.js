"use strict";

fit.controller("FitController", ["$scope", "api", function(scope, api){
	scope.activities = api.getActivities();

	scope.selectedActivity = scope.activities[0];

	scope.months = [
		{ id: 1, name: "Jan" },
		{ id: 2, name: "Feb" },
		{ id: 3, name: "Mar" },
		{ id: 4, name: "Apr" },
		{ id: 5, name: "Maj" },
		{ id: 6, name: "Jun" },
		{ id: 7, name: "Jul" },
		{ id: 8, name: "Aug" },
		{ id: 9, name: "Sep" },
		{ id: 10, name: "Oct" },
		{ id: 11, name: "Nov" },
		{ id: 12, name: "Dec" }
	];

	scope.selectedMonth = scope.months[4];

	scope.activity = api.getActivity(scope.selectedActivity.id, scope.selectedMonth.id);

	scope.changeActivityOrMonth = function(){
		scope.activity = api.getActivity(scope.selectedActivity.id, scope.selectedMonth.id);
	};
}]);
