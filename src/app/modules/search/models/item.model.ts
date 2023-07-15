import { IUser } from './user.model';
import { IPullRequest } from './pull-request.model';
import { IReactions } from './reactions.model';

export interface Item {
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
  assignee: any;
  assignees: any[];
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
