"use strict";

	describe("Calendar directive", function(){
		var element, scope;

		beforeEach(function(){
			module("fit", "templates");

			inject(function($rootScope, $compile){
				scope = $rootScope.$new();
				scope.activity = {
					name: "Running",
					month: 1,
					unit: "m",
					hits: [{ day: 10, quantity: 1000 }]
				};
				element = $compile(angular.element("<calendar activity='activity'></calendar>"))(scope);
				$rootScope.$digest();
			});
		});

		it("blabla", function(){
			var isoScope = element.isolateScope();
			expect(isoScope.majom()).toBe("majom");
			expect(isoScope.activity).toBeDefined();
			expect(isoScope.activity.name).toBe("Running");
		});
	});

describe("Calendar service", function(){
	var calendarService;

	beforeEach(function(){
		module("fit");

		inject(function(_calendarService_){
			calendarService = _calendarService_;
		});
	});

	it("should calculate first and last day of month", function(){
		var firstDays = [[0, 2],[1, 5],[2, 5],[3, 1],[4, 3],[5, 6],[6, 1],[7, 4],[8, 0],[9, 2],[10, 5],[11, 0]];

		var lastDays = [[0, 4],[1, 4],[2, 0],[3, 2],[4, 5],[5, 0],[6, 3],[7, 6],[8, 1],[9, 4],[10, 6],[11, 2]];

		for(var i = 0; i < 12; i++){
			expect(calendarService.getFirstDay(2014, firstDays[i][0])).toBe(firstDays[i][1]);

			expect(calendarService.getLastDay(2014, lastDays[i][0])).toBe(lastDays[i][1]);
		}
	});
});
