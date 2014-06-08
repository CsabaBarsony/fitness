"use strict";

describe("Cell directive", function(){
	var element;

	beforeEach(function(){
		module("fit", "templates");

		inject(function($rootScope, $compile){
			var scope = $rootScope.$new();
			scope.cell = {
				day: 5,
				hit: "1000m"
			};
			element = $compile(angular.element("<fit-cell cell='cell'></fit-cell>"))(scope);
			$rootScope.$digest();
		});
	});

	it("should contain correct data", function(){
		var isoScope = element.isolateScope();
		expect(isoScope.cell.day).toBe(5);
		expect(isoScope.cell.hit).toBe("1000m");
	});
});
