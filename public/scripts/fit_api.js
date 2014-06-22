"use strict";

fit.factory("api", ["$http", function(http){
	var api = {
		get: function(){
			http({ method: 'GET', url: '/users' }).
				success(function(data) {
					console.log(data);
				}).
				error(function(data) {
					console.log(data);
				});
		},
		set: function(data){
			http({ method: "POST", url: "/users", data: data }).
				success(function(data){
					console.log(data);
				}).
				error(function(data){
					console.log(data);
				});
		},
		createActivity: function(name, unit){
			var activity = { name: name, unit: unit, hits: [] }
			this.activities.push(activity);
			return activity;
		},

		readActivity: function(name, year, month){
			var activity = null;

			for(var i = 0, l = this.activities.length; i < l; i++){
				if(this.activities[i].name === name){
					activity = this.activities[i];
					break;
				}
			}

			if(activity === null){
				return { name: "", unit: "", year: year, month: month, hits: [] };
			}

			var result = { name: activity.name, unit: activity.unit, year: year, month: month, hits: [] };

			for(i = 0, l = activity.hits.length; i < l; i++){
				var date = activity.hits[i].date;
				var y = +date.substr(0, 4);
				var m = +date.substr(5, 2);
				if(y === year && m === month){
					result.hits.push({ day: getDay(activity.hits[i].date), quantity: activity.hits[i].quantity });
				}
			}

			return result;
		},

		updateActivity: function(oldName, newName, unit){
			for(var i = 0, l = this.activities.length; i < l; i++){
				if(this.activities[i].name === oldName){
					this.activities[i].name = newName;
					this.activities[i].unit = unit;
					return newName;
				}
			}

			throw new Error("FitApi.updateActivity() - Activity " + oldName + " doesn't exist");
		},

		deleteActivity: function(name){
			for(var i = 0, l = this.activities.length; i < l; i++){
				if(this.activities[i].name === name){
					this.activities.splice(i, 1);
					return true;
				}
			}

			throw new Error("FitApi.deleteActivity() - Activity " + name + " doesn't exist");
		},

		readActivities: function(){
			var result = [];
			for(var i = 0, l = this.activities.length; i < l; i++){
				result.push(this.activities[i].name);
			}
			return result;
		},

		createHit: function(name, year, month, day, quantity){
			validateParameters("createHit", [year, month, day, quantity]);

			var activity = null;

			for(var i = 0, l = this.activities.length; i < l; i++){
				if(this.activities[i].name === name){
					activity = this.activities[i];
					break;
				}
			}

			if(!activity){
				throw new Error("FitApi.createHit() - activity '" + name + "' doesn't exist");
			}

			for(i = 0, l = activity.hits.length; i < l; i++){
				if(activity.hits[i].date === createDate(year, month, day)){
					throw new Error("FitApi.createHit() - hit with date: " + activity.hits[i].date + " already exists");
				}
			}

			activity.hits.push({ date: createDate(year, month, day), quantity: quantity });

			return true;
		},

		updateHit: function(name, year, month, day, quantity){
			validateParameters("updateHit", [year, month, day, quantity]);

			var activity = null;

			for(var i = 0, l = this.activities.length; i < l; i++){
				if(this.activities[i].name === name){
					activity = this.activities[i];
					break;
				}
			}

			if(!activity){
				throw new Error("FitApi.createHit() - activity '" + name + "' doesn't exist");
			}

			var hit = null;

			for(i = 0, l = activity.hits.length; i < l; i++){
				if(activity.hits[i].date === createDate(year, month, day)){
					activity.hits[i].quantity = quantity;
					return true;
				}
			}

			throw new Error("FitApi.createHit() - hit with date: " + createDate(year, month, day) + " doesn't exist");
		},

		deleteHit: function(name, year, month, day){
			var activity = null;

			for(var i = 0, l = this.activities.length; i < l; i++){
				if(this.activities[i].name === name){
					activity = this.activities[i];
					break;
				}
			}

			if(!activity){
				throw new Error("FitApi.createHit() - activity '" + name + "' doesn't exist");
			}

			var date = createDate(year, month, day);

			for(i = 0, l = activity.hits.length; i < l; i++){
				if(activity.hits[i].date === date){
					activity.hits.splice(i, 1);
					return true;
				}
			}

			throw new Error("FitApi.deleteHit() - hit with date: " + createDate(year, month, day) + " doesn't exist");
		},

		activities: [
			{
				name: "Running",
				unit: "m",
				hits: [
					{ date: "2014-05-21", quantity: 2000 },
					{ date: "2014-06-01", quantity: 2100 },
					{ date: "2014-06-02", quantity: 2200 },
					{ date: "2014-06-11", quantity: 2400 },
					{ date: "2014-06-20", quantity: 2600 }
				]
			},
			{
				name: "Bench press",
				unit: "kg",
				hits: [
					{ date: "2014-05-11", quantity: 55 },
					{ date: "2014-06-03", quantity: 60 },
					{ date: "2014-06-05", quantity: 55 },
					{ date: "2014-06-10", quantity: 60 },
					{ date: "2014-06-15", quantity: 65 }
				]
			}
		]
	};

	function validateParameters(functionName, parameters){
		if(functionName === "createHit" || functionName === "updateHit"){
			if(parameters[0] < 2014){
				throw new Error("FitApi.createHit() - year must be 2014 or greater");
			}

			if(parameters[1] < 1 || parameters[1] > 12){
				throw new Error("FitApi.createHit() - month must be between 1 and 12 inclusive");
			}

			if(parameters[2] < 1 || parameters[2] > 31){
				throw new Error("FitApi.createHit() - day must be between 1 and 31 inclusive");
			}

			if(isNaN(parameters[3])){
				throw  new Error("FitApi.createHit() - quantity must be number");
			}
		}
	}

	function createDate(year, month, day){
		var m = null;

		if(month < 10){
			m = "0" + month;
		}
		else {
			m = "" + month;
		}

		var d = null;

		if(day < 10){
			d = "0" + day;
		}
		else {
			d = "" + day;
		}

		return "" + year + "-" + m + "-" + d;
	}

	function getDay(date){
		return +date.substr(8, 2);
	}

	return api;
}]);
