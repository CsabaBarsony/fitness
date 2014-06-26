"use strict";

var fit = angular.module("fit", []);

fit.directive("test", function(api){
	return {
		template: "<button ng-click='get()'>Get</button><button ng-click='set()'>Set</button><button ng-click='users()'>Users</button>",
		link: function(scope){
			scope.get = function(){
				api.get();
			};

			scope.set = function(){
				api.set({ name: "Márti" });
			};

			scope.users = function(){
				api.users();
			};
		}
	};
});
