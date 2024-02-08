import {EntityState, createEntityAdapter} from '@ngrx/entity';
import * as fromSearchActions from '../actions/search_actions';
import {Repository} from 'src/app/models/repositories_model';

export interface SearchState {
	paramToSearch: string;
	data: Repository[];
	loading: boolean;
	loaded: boolean;
	error: any;
}

const initialState: SearchState = {
	paramToSearch: '',
	loaded: false,
	loading: false,
	error: '',
	data: [],
};

export function reducer(
	state = initialState,
	action: fromSearchActions.SearchActions
): SearchState {
	switch (action.type) {
		case fromSearchActions.SearchActionTypes.LOAD_REPOSITORIES: {
			if (state.paramToSearch !== action.payload) {
				return {...initialState, paramToSearch: action.payload, loading: true};
			}

			return {
				...state,
				loading: true,
				paramToSearch: action.payload,
			};
		}

		case fromSearchActions.SearchActionTypes.LOAD_REPOSITORIES_SUCCESS: {
			return {
				...state,
				data: [...state.data, ...action.payload],
				loaded: true,
				loading: false,
			};
		}

		case fromSearchActions.SearchActionTypes.LOAD_REPOSITORIES_FAIL: {
			return {
				...state,
				error: action.payload,
			};
		}

		default: {
			return state;
		}
	}
}

export const getSearchSate = (state: SearchState) => state;
export const getLoading = (state: SearchState) => state.loading;
export const getParamToSearch = (state: SearchState) => state.paramToSearch;
export const getData = (state: SearchState) => state.data;
