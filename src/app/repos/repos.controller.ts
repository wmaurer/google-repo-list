import { routeStates } from "../app.config.router";

interface IReposController {
	repoStore: githubRepos.IRepoStore;
}

interface IStateParams extends ng.ui.IStateParamsService {
	pageNumber: string;
	repoId: string;
}

/* @ngInject */
export default function($state: ng.ui.IStateService, $stateParams: IStateParams, $rootScope: ng.IScope, repoStore: githubRepos.IRepoStore) {
	const vm = <IReposController>this;
	vm.repoStore = repoStore;

	activate();	
	
	//////
	
	function activate() {
		rerouteIfNecessary(repoStore.getRepos($stateParams.pageNumber, $stateParams.repoId));
		
		$rootScope.$on("$stateChangeStart", (event: ng.IAngularEvent, toState: ng.ui.IState, toParams: IStateParams) => {
			if ($state.includes(routeStates.repos)) {
				rerouteIfNecessary(repoStore.setClearCurrentRepo(toParams.repoId));
			}
		});
	}
	
	function rerouteIfNecessary(promise: ng.IPromise<githubRepos.IRepo>) {
		promise.catch(() => {
			$state.go(routeStates.repos, { pageNumber: $stateParams.pageNumber });		
		});
	}
}
