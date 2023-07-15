import { Injectable } from '@angular/core';
import { ConnectorService } from '@core/services/connector/connector.service';
import { environment } from '@environments/environment';
import { Item } from '@modules/search/models/item.model';
import { Observable, EMPTY, throwError, BehaviorSubject, Subject } from 'rxjs';
import {
  map,
  delay,
  expand,
  scan,
  take
} from 'rxjs/operators';
import { ApiGithubResponse } from '../../models/response-api.model';

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

    return this._connectorService.mGet(url).pipe(
      delay(500)
    );
  }

  search(value: string): Observable<Object | Item[]> {
    if(!value){
      return EMPTY;
    }

    debugger;

    this.valueToSearch = value;
    const url = this.getUrl();

    return this.getDataFromApi(url)
    .pipe(
      map((response: ApiGithubResponse) => {
        
        if(response.errors){
          return throwError(() => response.message);
        }

        const results = [...this.dataCollection$.getValue(), ...response.items];
        this.setDataCollection(results);
        return results;
      })
    );
  }

  encodeValueToUri(value: string): string{
    return encodeURIComponent(value);
  }

  setDataCollection(data: Item[]): void {
    this.dataCollection$.next(data);
  }

  getUrl(): string {
    this.pagesCounter++;

    return this.apiUrl + '?q=' +
      this.encodeValueToUri(this.valueToSearch) +
      '&page=' +
      this.pagesCounter;
  }

  searchFromScroll() {
    this.search(this.valueToSearch);
  }

}
