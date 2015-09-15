export default (): ng.IDirective => {
	return {
		restrict: "E",
		template: require("./repo-list.html"),
		controller:	require("./repo-list.controller").default,
		controllerAs: "repoListCtrl",
		scope: {},
		bindToController: {
			"repos": "=",
			"pageNavs": "="
		}
	};
}
