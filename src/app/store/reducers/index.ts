import {
	ActionReducerMap,
	createFeatureSelector,
	createSelector,
} from '@ngrx/store';
import * as fromSearchReducers from './search_reducers';

export interface AppState {
	search: fromSearchReducers.SearchState;
}

export const reducers: ActionReducerMap<AppState, any> = {
	search: fromSearchReducers.reducer,
};

// SELECTORS

export const getSearchState =
	createFeatureSelector<fromSearchReducers.SearchState>('search');

export const getLoading = createSelector(
	getSearchState,
	fromSearchReducers.getLoading
);

export const getParamToSearch = createSelector(
	getSearchState,
	fromSearchReducers.getParamToSearch
);

export const getDataSearched = createSelector(
	getSearchState,
	fromSearchReducers.getData
);
