"use strict";

describe("Fit Api", function(){
	var service;

	beforeEach(function(){
		module("fit");

		inject(function(_api_){
			service = _api_;
		});
	});

	it("readActivity() should return array of hits", function(){
		expect(service.readActivity("Running", 2014, 6).hits.length).toBe(4);
		expect(service.readActivity("Running", 2014, 5).hits).toEqual([{ day: 21, quantity: 2000 }]);
	});

	it("readActivities() should return activities", function(){
		expect(service.readActivities()).toEqual([ "Running", "Bench press"]);
	});

	it("createActivity() should work properly...", function(){
		service.createActivity("Wall climbing", "min");
	});

	it("createHit() should throw error when Hit with date already exists", function(){
		expect(function(){ service.createHit("Running", 2014, 5, 21, 1234) }).toThrow(new Error("FitApi.createHit() - hit with date: 2014-05-21 already exists"));
	});

	it("updateHit() should throw error when Hit with date doesn't exists", function(){
		expect(function(){service.updateHit("Running", 2014, 5, 20, 1234) }).toThrow(new Error("FitApi.createHit() - hit with date: 2014-05-20 doesn't exist"));
	});
});
