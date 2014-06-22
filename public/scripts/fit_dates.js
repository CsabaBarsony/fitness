"use strict";

fit.factory("dates", function(){
	return {
		now: function(){
			return Math.floor(Date.now() / 1000);
		},
		getYear: function(){
			return new Date().getFullYear();
		},
		getMonth: function(){
			return new Date().getMonth() + 1;
		},
		getDay: function(){
			return new Date().getDate();
		}
	};
});