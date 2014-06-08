"use strict";

fit.directive("fitCell", ["fitCellService", function(cellService){
	return {
		restrict: "E",
		replace: true,
		templateUrl: "templates/fit_cell.html",
		scope: {
			cell: "="
		},
		link: function(scope){
			scope.setDay = function(day){
				if(day > 0){
					return day;
				}
			};

			scope.dayClick = function(day){

			};
		}
	}
}]);

fit.factory("fitCellService", function(){

});
