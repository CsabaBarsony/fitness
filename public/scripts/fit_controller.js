"use strict";

fit.controller("FitController", ["$scope", "api", function(scope, api){
	scope.activity = { status: "loading", message: "Please wait..." };

	scope.activities = [];

	scope.selectedActivity = "";

	var activitiesArrived = api.readActivities();

	activitiesArrived.then(function(activities){
		scope.activities = activities;

		scope.selectedActivity = scope.activities[0];

		refreshActivity();

	}, null, function(notification){
		scope.activities = [notification];

		scope.selectedActivity = scope.activities[0];

	});

	scope.months = createMonths();

	scope.selectedMonth = scope.months[new Date().getMonth()];

	scope.years = createYears();

	scope.selectedYear = scope.years[0];

	scope.optionsChange = function(){
		refreshActivity();
	};

	scope.$on("cellChanged", function(){
		refreshActivity();
	});

	scope.$on("activityChanged", function(){
		refreshActivity();
	});

	function refreshActivity(){
		var activityArrived = api.readActivity(scope.selectedActivity, scope.selectedYear, scope.selectedMonth.id);

		activityArrived.then(function(activity){
			scope.activity = activity;

		}, null, function(notification){
			scope.activity = { status: "loading", message: notification };
		});
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

		if(api.getActivity(name)){
			alert("Activity '" + name + "' already exist!");
			return;
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

		var activitiesArrived = api.readActivities();

		activitiesArrived.then(function(newActivity){
			scope.activities = newActivity;

			scope.selectedActivity = newActivity.name;

			refreshActivity();
		});
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

		if(api.getActivity(name)){
			alert("Activity '" + name + "' already exist!");
			return;
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

		refreshActivity();
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

	scope.logout = function(){
		api.logout();
	};

	function createMonths(){
		return [
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
	}

	function createYears(){
		return [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];
	}
}]);
