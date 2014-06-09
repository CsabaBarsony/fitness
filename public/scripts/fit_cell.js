"use strict";

fit.directive("fitCell", ["fitCellService", "api", function(cellService, api){
	return {
		restrict: "E",
		replace: true,
		templateUrl: "templates/fit_cell.html",
		scope: {
			cell: "="
		},
		link: function(scope){
			scope.formatDay = function(){
				if(scope.cell.day > 0){
					return scope.cell.day;
				}
			};

			scope.formatHit = function(){
				if(scope.cell.quantity){
					return scope.cell.quantity + scope.cell.unit;
				}
			};

			scope.createHit = function(){
				var quantity = prompt("New hit at " + scope.cell.year + "." + scope.cell.month + "." + scope.cell.day + " (" + scope.cell.unit + ")", "");
				var hit = {
					year: scope.cell.year,
					month: scope.cell.month,
					day: scope.cell.day,
					activity: scope.cell.activity,
					unit: scope.cell.unit,
					quantity: quantity
				};
				api.createHit(hit);
			};

			scope.updateHit = function(){
				console.log("update");
			};
		}
	}
}]);

fit.factory("fitCellService", function(){

});
