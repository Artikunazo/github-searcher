import {Action} from '@ngrx/store';
import {Repository} from 'src/app/models/repositories_model';

export enum SearchActionTypes {
	LOAD_REPOSITORIES = '[Search] Load Repositories',
	LOAD_REPOSITORIES_SUCCESS = '[Search] Load Repositores Success',
	LOAD_REPOSITORIES_FAIL = '[Search] Load Repositories Fail',
}

export class LoadRepositories implements Action {
	readonly type = SearchActionTypes.LOAD_REPOSITORIES;

	constructor(public payload: string) {}
}

export class LoadRepositoriesSuccess implements Action {
	readonly type = SearchActionTypes.LOAD_REPOSITORIES_SUCCESS;

	constructor(public payload: Repository[]) {}
}

export class LoadRepositoriesFail implements Action {
	readonly type = SearchActionTypes.LOAD_REPOSITORIES_FAIL;

	constructor(public payload: any) {}
}

export type SearchActions =
	| LoadRepositories
	| LoadRepositoriesSuccess
	| LoadRepositoriesFail;
