"use strict";

fit.factory("api", function(){
	return {
		getActivities: function(){
			return [
				{ id: 1, name: "Running" },
				{ id: 2, name: "Bench press"}
			];
		},
		getActivity: function(activity, month){
			if(activity === 1){
				return {
					name: "Running",
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
	};
});
