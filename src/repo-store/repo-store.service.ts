const _ = <_.LoDashStatic>require('lodash-node/compat');

class RepoStore implements githubRepos.IRepoStore {
	repoCollection: githubRepos.IRepo[] = [];
	currentRepo: githubRepos.IRepo = undefined;
	pageNavs: githubRepos.IPageNavs;
	
	/* @ngInject */
	constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
	}
	
	getRepos(pageNumber: string, repoId: string): ng.IPromise<githubRepos.IRepo> {
		return this.$http.get<IRepoDto[]>(`https://api.github.com/users/google/repos?sort=updated&direction=desc&page=${pageNumber}`)
			.then(response => {
				this.pageNavs = this.parseLinkHeader(response.headers("link"));
				this.repoCollection = response.data.map(r => <githubRepos.IRepo>{
					id: r.id,
					name: r.name,
					htmlUrl: r.html_url,
					fullName: r.full_name,
					description: r.description,
					uiSref: `repos.detail({repoId: ${r.id}})`,
					readmeMdUrl: `https://raw.githubusercontent.com/${r.full_name}/master/README.md`
				});
			})
			.then(() => this.setClearCurrentRepo(repoId));
	}
	
	setClearCurrentRepo(repoId: string): ng.IPromise<githubRepos.IRepo> {
		const intRepoId = parseInt(repoId) || undefined;
		if (intRepoId) {
			return this.setCurrentRepo(intRepoId).then(() => this.currentRepo);
		} else {
			return this.clearCurrentRepo().then(undefined);
		}		
	}
	
	private setCurrentRepo(repoId: number): ng.IPromise<void> {
		const repo = _.find(this.repoCollection, r => r.id == repoId);
		if (repo) {
			this.currentRepo = repo;
			return this.$http.get<string>(repo.readmeMdUrl)
				.then(response => {
					repo.readmeMarkdown = response.data;
				})
				.catch(() => {});
		} 
		return this.$q.reject();
	}
	
	private clearCurrentRepo() : ng.IPromise<void> {
		this.currentRepo = undefined;
		return this.$q.when();
	}
	
	private parseLinkHeader(headers: string): githubRepos.IPageNavs {
		const headersParsed = headers
			.match(/(<[^,]+),?/g)
			.map(link => {
				const linkParsed = link.match(/<([^>]+)page=(\d+)>; rel="(\w+)",?/);
				return {
					label: linkParsed[3],
					pageNumber: linkParsed[2]
				}
			});
		return _.indexBy(headersParsed, "label");		
	}
}

export default RepoStore;

//////

interface IRepoDto {
	id: number;
	owner: {
		login: string;
		id: number;
		avatar_url: string;
		gravatar_id: string;
		url: string;
		html_url: string;
		followers_url: string;
		following_url: string;
		gists_url: string;
		starred_url: string;
		subscriptions_url: string;
		organizations_url: string;
		repos_url: string;
		events_url: string;
		received_events_url: string;
		type: string;
		site_admin: boolean;
	}
	name: string;
	full_name: string;
	description: string;
	private: boolean;
	fork: boolean;
	url: string;
	html_url: string;
}
