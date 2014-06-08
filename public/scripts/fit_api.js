"use strict";

fit.factory("api", function(){
	return {
		getActivities: function(){
			return [
				{ id: 1, name: "Running" },
				{ id: 2, name: "Bench press"}
			];
		},
		saveHit: function(hit){
			console.log("Hit saved: " + JSON.stringify(hit, null, 4));
		},
		getActivity: function(activity, year, month){
			if(month === 4){
				if(activity === 1){
					return {
						name: "Running",
						year: year,
						month: month,
						unit: "m",
						hits: [
							{
								day: 2,
								quantity: 2500
							},
							{
								day: 12,
								quantity: 2700
							},
							{
								day: 16,
								quantity: 3000
							}
						]
					};
				}
				else if(activity === 2){
					return {
						name: "Bench press",
						year: year,
						month: month,
						unit: "kg",
						hits: [
							{
								day: 3,
								quantity: 60
							},
							{
								day: 10,
								quantity: 70
							},
							{
								day: 19,
								quantity: 67
							}
						]
					};
				}
			}
			else if(month === 1){
				if(activity === 1){
					return {
						name: "Running",
						year: year,
						month: month,
						unit: "m",
						hits: [
							{
								day: 10,
								quantity: 3000
							},
							{
								day: 20,
								quantity: 2700
							},
							{
								day: 23,
								quantity: 3100
							}
						]
					};
				}
				else if(activity === 2){
					return {
						name: "Bench press",
						year: year,
						month: month,
						unit: "kg",
						hits: [
							{
								day: 5,
								quantity: 70
							},
							{
								day: 9,
								quantity: 70
							},
							{
								day: 13,
								quantity: 75
							}
						]
					};
				}
			}
			else {
				if(activity === 1){
					return {
						name: "Running",
						year: year,
						month: month,
						unit: "m",
						hits: []
					}
				}
				else if(activity === 2){
					return {
						name: "Bench press",
						year: year,
						month: month,
						unit: "kg",
						hits: []
					}
				}
			}
		}
	};
});
