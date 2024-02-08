import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {SearchService} from 'src/app/api/search.service';
import {Item} from 'src/app/models/item.model';
import {Store} from '@ngrx/store';
import * as fromStore from 'src/app/store';
import {Repository} from 'src/app/models/repositories_model';

@Component({
	selector: 'main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
	public results: Repository[] = [];
	public scrollChanged = new Subject<any>();

	private subscriptions$ = new Subscription();

	constructor(
		private _searchService: SearchService,
		private readonly store: Store<fromStore.AppState>
	) {}

	ngOnInit(): void {
		this.store.select(fromStore.getDataSearched).subscribe({
			next: (response: any) => {
				this.results = response;
			},
		});
	}

	onScroll() {
		this.store.select(fromStore.getParamToSearch).subscribe({
			next: (response: string) => {
				this.store.dispatch(new fromStore.LoadRepositories(response));
			},
		});
	}

	ngOnDestroy(): void {
		this.subscriptions$.unsubscribe();
	}
}
