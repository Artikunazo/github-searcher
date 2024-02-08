import {Component, OnInit, OnDestroy} from '@angular/core';
import {UntypedFormBuilder, Validators, UntypedFormGroup} from '@angular/forms';
import {SearchService} from '../../../../api/search.service';
import {Subscription} from 'rxjs';
import {debounceTime, delay} from 'rxjs/operators';
import {Item} from '@modules/search/models/item.model';
import {Store} from '@ngrx/store';
import * as fromStore from 'src/app/store';

@Component({
	selector: 'search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit, OnDestroy {
	public typeSearchList: string[] = [];
	public formSearch: UntypedFormGroup;
	public loading: boolean = false;

	private requestSent: boolean = false;
	private subscriptions$ = new Subscription();

	constructor(
		private readonly _formBuilder: UntypedFormBuilder,
		private readonly _searchService: SearchService,
		private readonly store: Store<fromStore.AppState>
	) {
		this.formSearch = this._formBuilder.group({
			search: ['', [Validators.required]],
		});
	}

	ngOnInit(): void {
		this.setSearchFieldLiestener();
	}

	setSearchFieldLiestener() {
		this.formSearch
			.get('search')
			?.valueChanges.pipe(debounceTime(500))
			.subscribe((value) => {
				this.search(value);
			});
	}

	search(value: string): void {
		this.store
			.select(fromStore.getLoading)
			.subscribe((response) => (this.loading = response));

		this.store.dispatch(new fromStore.LoadRepositories(value));
	}

	setDataCollection(data: Item[]): void {
		this._searchService.setDataCollection(data);
	}

	cancelQueue(): void {
		this.loading = false;
		this.requestSent = false;
	}

	ngOnDestroy(): void {
		this.subscriptions$.unsubscribe();
	}
}
