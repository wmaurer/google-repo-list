const template = require("./repos.html");
import controller from "./repos.controller";

/* @ngInject */
export default (): ng.IDirective => {
	return {
		restrict: "E",
		template,
		controller,
		controllerAs: "reposCtrl",
		scope: {}
	};
}
