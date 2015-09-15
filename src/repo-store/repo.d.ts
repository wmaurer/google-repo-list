declare module githubRepos {
	export interface IRepo {
		id: number;
		name: string;
		fullName: string;
		description: string;
		uiSref: string;
		htmlUrl: string;
		readmeMdUrl: string;
		readmeMarkdown: string;
	}
	
	export interface IRepoStore {
		repoCollection: IRepo[];
		currentRepo: IRepo;
		getRepos(pageNumber: string, repoId: string): ng.IPromise<githubRepos.IRepo>;
		setClearCurrentRepo(repoId: string): ng.IPromise<githubRepos.IRepo>;
	}
	
	export interface IPageNavs {
		[key: string]: { label: string; pageNumber: string };
	}
}
