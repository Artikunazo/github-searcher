import {Injectable} from '@angular/core';
import {ConnectorService} from '@core/services/connector/connector.service';
import {environment} from '@environments/environment';
import {Item} from '@modules/search/models/item.model';
import {Observable, EMPTY, throwError, BehaviorSubject} from 'rxjs';
import {map, delay} from 'rxjs/operators';
import {ApiGithubResponse} from '../modules/search/models/response-api.model';

@Injectable({
	providedIn: 'root',
})
export class SearchService {
	public dataCollection$ = new BehaviorSubject<Item[]>([]);

	private apiUrl = environment.apiUrl;
	private pagesCounter = 0;
	private valueToSearch = '';

	constructor(private _connectorService: ConnectorService) {}

	getDataFromApi(url: string = ''): Observable<any> {
		if (!url) {
			url = this.apiUrl;
		}

		return this._connectorService.mGet(url).pipe(delay(500));
	}

	search(value: string): Observable<any> {
		if (!value) {
			return EMPTY;
		}

		this.valueToSearch = value;
		const url = this.getUrl();

		return this.getDataFromApi(url).pipe(
			map((response: ApiGithubResponse) => {
				if (response.errors) {
					return throwError(() => response.message);
				}

				return response.items;
			})
		);
	}

	encodeValueToUri(value: string): string {
		return encodeURIComponent(value);
	}

	setDataCollection(data: Item[]): void {
		this.dataCollection$.next(data);
	}

	getUrl(): string {
		this.pagesCounter++;

		return (
			this.apiUrl +
			'?q=' +
			this.encodeValueToUri(this.valueToSearch) +
			'&page=' +
			this.pagesCounter
		);
	}

	searchFromScroll() {
		this.search(this.valueToSearch);
	}
}
