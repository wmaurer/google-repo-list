const template = require("./repo-detail.html");
import controller from  "./repo-detail.controller";

/* @ngInject */
export default (): ng.IDirective => {
	return {
		restrict: "E",
		template,
		controller,
		controllerAs: "repoDetailCtrl",
		scope: {},
		bindToController: {
			"repo": "="
		}
	};
};
