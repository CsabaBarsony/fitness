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

	scope.selectedMonth = scope.months[new Date().getMonth()];

	scope.years = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];

	scope.selectedYear = scope.years[0];

	scope.optionsChange = function(){
		refreshActivity();
	};

	scope.$on("cellChanged", function(){
		refreshActivity();
	});

	scope.$on("activityChanged", function(){
		scope.activities = api.readActivities();
	});

	function refreshActivity(){
		scope.activity = api.readActivity(scope.selectedActivity, scope.selectedYear, scope.selectedMonth.id);
	}

	scope.createActivity = function(){
		var name = prompt("What is the name of the new Activity?");

		if(name === null){
			return;
		}

		if(name.length < 3){
			alert("Activity name must be at least 3 characters long!");
			return;
		}

		if(name.length > 128){
			throw new Error("FitControllerService.createActivity - too long Activity name");
		}

		var unit = prompt("What is the Unit of the Activity? (Optional)");

		if(unit === null){
			return;
		}

		if(unit.length > 128){
			throw new Error("FitControllerService.createActivity - too long Unit name");
		}

		var selectedActivity = api.createActivity(name, unit);

		if(!selectedActivity){
			throw new Error("FitController.createActivity() - error while creating new Activity");
		}

		scope.activities = api.readActivities();

		scope.selectedActivity = selectedActivity.name;

		refreshActivity();
	};

	scope.updateActivity = function(){
		var name = prompt("What is the new name of the Activity? (" + scope.selectedActivity + ")");

		if(name === null){
			return;
		}

		if(name.length < 3){
			alert("Activity name must be at least 3 characters long!");
			return;
		}

		if(name.length > 128){
			throw new Error("FitControllerService.createActivity - too long Activity name")
		}

		var unit = prompt("What is the new Unit of the Activity? (Optional)");

		if(unit === null){
			return;
		}

		if(unit.length > 128){
			throw new Error("FitControllerService.createActivity - too long Unit name");
		}

		var selectedActivity = api.updateActivity(scope.selectedActivity, name, unit);

		if(!selectedActivity){
			throw new Error("FitController.updateActivity() - error while saving new Activity");
		}

		scope.activities = api.readActivities();

		scope.selectedActivity = selectedActivity;
	};

	scope.deleteActivity = function(){
		if(!confirm("Delete Activity '" + scope.selectedActivity + "'?")){
			return;
		}

		if(api.deleteActivity(scope.selectedActivity)){
			scope.activities = api.readActivities();

			scope.selectedActivity = scope.activities[0];

			refreshActivity();
		}
	};

	refreshActivity();
}]);
