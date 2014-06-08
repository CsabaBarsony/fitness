"use strict";

describe("Calendar directive", function(){
	var element;

	beforeEach(function(){
		module("fit", "templates");

		inject(function($rootScope, $compile){
			var scope = $rootScope.$new();
			scope.activity = {
				name: "Running",
				year: 2014,
				month: 2,
				unit: "m",
				hits: [{ day: 10, quantity: 1000 }]
			};
			element = $compile(angular.element("<fit-calendar activity='activity'></fit-calendar>"))(scope);
			$rootScope.$digest();
		});
	});

	it("should contain correct data", function(){
		var isoScope = element.isolateScope();
		expect(isoScope.activity.name).toBe("Running");
		expect(isoScope.activity.hits.length).toBe(1);
		expect(isoScope.cells[15].hit).toBe("1000m");
		expect(isoScope.cells.length).toBe(36);
	});
});

describe("Calendar service", function(){
	var calendarService;

	beforeEach(function(){
		module("fit");

		inject(function(_fitCalendarService_){
			calendarService = _fitCalendarService_;
		});
	});

	it("should calculate first and last day of month", function(){
		var firstDays = [[1, 2],[2, 5],[3, 5],[4, 1],[5, 3],[6, 6],[7, 1],[8, 4],[9, 0],[10, 2],[11, 5],[12, 0]];

		var lastDays = [[1, 4],[2, 4],[3, 0],[4, 2],[5, 5],[6, 0],[7, 3],[8, 6],[9, 1],[10, 4],[11, 6],[12, 2]];

		for(var i = 0; i < 12; i++){
			expect(calendarService.getFirstDayOffset(2014, firstDays[i][0])).toBe(firstDays[i][1]);

			expect(calendarService.getLastDayOffset(2014, lastDays[i][0])).toBe(lastDays[i][1]);
		}
	});

	it("should return the number of weeks in a month", function(){
		expect(calendarService.getWeeksArray(2014, 1)).toEqual([1, 2, 3, 4, 5]);
		expect(calendarService.getWeeksArray(2014, 2)).toEqual([1, 2, 3, 4, 5]);
		expect(calendarService.getWeeksArray(2014, 3)).toEqual([1, 2, 3, 4, 5, 6]);
		expect(calendarService.getWeeksArray(2021, 2)).toEqual([1, 2, 3, 4]);
	});

	it("should set the correct day", function(){
		expect(calendarService.setDay(1, 2014, 1)).toBe(0);
		expect(calendarService.setDay(2, 2014, 1)).toBe(0);
		expect(calendarService.setDay(3, 2014, 1)).toBe(1);
		expect(calendarService.setDay(33, 2014, 1)).toBe(31);
		expect(calendarService.setDay(34, 2014, 1)).toBe(0);
	});
});
