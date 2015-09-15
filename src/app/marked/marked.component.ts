const marked = require("marked");

/* @ngInject */
export default (): ng.IDirective => {
	return {
		restrict: "E",
		require: "ngModel",
		link: (scope: ng.IScope, elem: ng.IAugmentedJQuery, attrs: ng.IAttributes, ngModel: ng.INgModelController) => {
			ngModel.$render = () => {
				elem.html(marked(ngModel.$viewValue || ""));
			}
		}
	};
};
