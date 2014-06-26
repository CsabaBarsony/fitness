"use strict";

describe("Fit Controller", function(){
	var controller, scope;

	beforeEach(function(){
		module("fit");

		inject(function($controller, $rootScope){
			scope = $rootScope.$new();

			controller = $controller("FitController", { $scope: scope });
		});
	});
});