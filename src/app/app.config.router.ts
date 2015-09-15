export const routeStates = {
	repos: "repos",
	reposDetail: "repos.detail"
};

/* @ngInject */
export default ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
	$stateProvider.state(routeStates.repos, {
		url: "/repos/:pageNumber",
		template: "<repos></repos>"
	})
	$stateProvider.state(routeStates.reposDetail, {
		url: "/:repoId"
	});
	
	$urlRouterProvider.otherwise("/repos/1");
}
