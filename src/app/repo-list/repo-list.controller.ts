interface IRepoList {
	repos: githubRepos.IRepo[];
}

/* @ngInject */
export default function(repoStore: githubRepos.IRepoStore) {
	const vm = <IRepoList>this;
}
