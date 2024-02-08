import {Injectable, inject} from '@angular/core';
import {EMPTY, Observable, delay, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromSearchActions from '../actions/search_actions';
import {map, switchMap, catchError} from 'rxjs';
import {Repository} from 'src/app/models/repositories_model';
import {SearchService} from 'src/app/api/search.service';
import {ApiGithubResponse} from 'src/app/models/response-api.model';

@Injectable({
	providedIn: 'root',
})
export class SearchEffects {
	protected readonly searchActionTypes = fromSearchActions.SearchActionTypes;
	protected readonly searchService = inject(SearchService);

	constructor(private actions$: Actions) {}

	loadRepositories$: Observable<Action> = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.searchActionTypes.LOAD_REPOSITORIES),
			map((action: fromSearchActions.LoadRepositories) => {
				return action.payload;
			}), // extract the payload
			switchMap((response: string) => {
				return this.searchService.search(response).pipe(
					map((data: ApiGithubResponse) => {
						return new fromSearchActions.LoadRepositoriesSuccess(data.items);
					}),
					catchError((error: string) => {
						return of(new fromSearchActions.LoadRepositoriesFail(error));
					})
				);
			})
		);
	});
}
