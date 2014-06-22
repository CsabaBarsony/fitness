"use strict";

var fit = angular.module("fit", []);

fit.directive("test", function(api){
	return {
		template: "<button ng-click='get()'>Get</button><button ng-click='set()'>Set</button>",
		link: function(scope){
			scope.get = function(){
				api.get();
			};

			scope.set = function(){
				api.set({ name: "Csati" });
			};
		}
	};
});
