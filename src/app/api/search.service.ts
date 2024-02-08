import {Injectable, inject} from '@angular/core';
import {environment} from '@environments/environment';
import {Item} from 'src/app/models/item.model';
import {Observable, EMPTY, throwError, BehaviorSubject} from 'rxjs';
import {map, delay} from 'rxjs/operators';
import {ApiGithubResponse} from '../models/response-api.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class SearchService {
	protected readonly httpClient = inject(HttpClient);
	// public dataCollection$ = new BehaviorSubject<Item[]>([]);

	private apiUrl = environment.apiUrl;
	private pagesCounter = 0;
	private valueToSearch = '';

	search(value: string): Observable<any> {
		if (!value) {
			return EMPTY;
		}

		this.valueToSearch = value;
		const url = this.getUrl();

		return this.httpClient.get(url);
	}

	encodeValueToUri(value: string): string {
		return encodeURIComponent(value);
	}

	setDataCollection(data: Item[]): void {
		// this.dataCollection$.next(data);
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
