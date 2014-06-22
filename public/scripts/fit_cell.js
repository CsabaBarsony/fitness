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

				if(quantity === null){
					return;
				}

				if(quantity === ""){
					alert("Quantity cannot be empty!");
					return;
				}

				if(isNaN(quantity)){
					alert("Quantity must be a number!");
					return;
				}

				if(!api.createHit(scope.cell.activity, scope.cell.year, scope.cell.month, scope.cell.day, quantity)){
					throw new Error("FitCell.createHit() - Error while creating new Hit");
				}

				scope.$emit("cellChanged");
			};

			scope.updateHit = function(){
				var quantity = prompt("Update hit at " + scope.cell.year + "." + scope.cell.month + "." + scope.cell.day + " (" + scope.cell.quantity + scope.cell.unit + ")", "");

				if(quantity === null){
					return;
				}

				if(quantity === ""){
					alert("Quantity cannot be empty!");
					return;
				}

				if(isNaN(quantity)){
					alert("Quantity must be a number!");
					return;
				}

				if(!api.updateHit(scope.cell.activity, scope.cell.year, scope.cell.month, scope.cell.day, quantity)){
					throw new Error("FitCell.createHit() - Error while creating new Hit");
				}

				scope.$emit("cellChanged");
			};

			scope.deleteHit = function(){
				if(!confirm("Delete Hit? (" + scope.cell.quantity + scope.cell.unit + ")")){
					return;
				}

				if(!api.deleteHit(scope.cell.activity, scope.cell.year, scope.cell.month, scope.cell.day)){
					throw new Error("FitCell.deleteHit() - Error while deleting Hit");
				}

				scope.$emit("cellChanged");
			};
		}
	}
}]);

fit.factory("fitCellService", function(){

});
