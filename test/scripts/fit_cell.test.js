"use strict";

describe("Cell directive", function(){
	var element;

	beforeEach(function(){
		module("fit", "templates");

		inject(function($rootScope, $compile){
			var scope = $rootScope.$new();
			scope.cell = {
				day: 5,
				quantity: 1000,
				unit: "m",
				month: 1,
				year: 2014,
				activity: "Running"
			};
			element = $compile(angular.element("<fit-cell cell='cell'></fit-cell>"))(scope);
			$rootScope.$digest();
		});
	});

	it("should contain correct data", function(){
		var isoScope = element.isolateScope();
		expect(isoScope.cell.day).toBe(5);
		expect(isoScope.cell.quantity).toBe(1000);
		expect(isoScope.cell.unit).toBe("m");
		expect(isoScope.cell.month).toBe(1);
		expect(isoScope.cell.year).toBe(2014);
		expect(isoScope.cell.activity).toBe("Running");
	});
});
