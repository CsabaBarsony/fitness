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
			return {
				name: "Running",
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
	};
});
