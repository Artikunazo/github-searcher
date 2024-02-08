export interface Repository {
	url: string;
	repository_url: string;
	labels_url: string;
	comments_url: string;
	events_url: string;
	html_url: string;
	id: number;
	node_id: string;
	number: number;
	title: string;
	user: IUser;
	labels: any[];
	state: string;
	locked: boolean;
	assignee: Assignee;
	assignees: Assignee[];
	milestone: any;
	comments: number;
	created_at: Date;
	updated_at: Date;
	closed_at: Date;
	author_association: string;
	active_lock_reasion: any;
	draft: boolean;
	pull_request: IPullRequest;
	body: string;
	reactions: IReactions;
	timeline_url: string;
	performed_via_github_app: any;
	score: number;
}

export interface Assignee {
	html_url: string;
	login: string;
}

export interface IUser {
	login: string;
	id: number;
	node_id: string;
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

export interface IPullRequest {
	url: string;
	html_url: string;
	diff_url: string;
	patch_url: string;
	merged_at: Date;
}

export interface IReactions {
	url: string;
	total_count: number;
	'+1': 0;
	'-1': 0;
	laugh: 0;
	hooray: 0;
	confused: 0;
	heart: 0;
	rocket: 0;
	eyes: 0;
}
