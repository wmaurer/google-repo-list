interface IRepoDetail {
	repo: githubRepos.IRepo;
}

/* @ngInject */
export default function(repoStore: githubRepos.IRepoStore, $scope: ng.IScope) {
	const vm = <IRepoDetail>this;
};
