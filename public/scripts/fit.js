"use strict";

var fit = angular.module("fit", []);

fit.config(function($httpProvider){
	$httpProvider.interceptors.push(function($q, $window){
		return {
			responseError: function(rejection){
				if(rejection.status === 401){
					sessionStorage.setItem("redirectReason", "0");
					$window.location.href = "/login.html";
				}
				return $q.reject(rejection);
			}
		};
	});
});

fit.run(function(api, $interval){
	api.authorize();

	$interval(function(){
		api.authorize();
	}, 60000);
});

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
