import { Injectable } from '@angular/core';
import { ConnectorService } from '@core/services/connector/connector.service';
import { environment } from '@environments/environment';
import { IItem } from '@modules/search/models/item.model';
import { Observable, EMPTY, throwError, BehaviorSubject, Subject } from 'rxjs';
import {
  map,
  delay,
  expand,
  scan,
  take
} from 'rxjs/operators';
import { IResponseAPI } from '../../models/response-api.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public dataCollection$ = new BehaviorSubject<IItem[]>([]);
  public stopRequestQueue:boolean = false;

  private apiUrl = environment.apiUrl;
  private pagesCounter: number = 1;
  private valueToSearch: string = '';

  constructor(private _connectorService: ConnectorService) {}

  getDataFromApi(url: string = ''): Observable<any> {

    if (!url) {
      url = this.apiUrl;
    }

    return this._connectorService.mGet(url).pipe(
      delay(500)
    );
  }

  search(value: string): Observable<Object | IItem[]> {
    if(!value){
      return EMPTY;
    }

    this.valueToSearch = value;
    const url = this.getUrl();

    return this.searchMoreResults(this.getDataFromApi(url))
    .pipe(
      map((data: IResponseAPI) => {
        console.log('search', data);

        if(data.errors){
          return throwError(() => data.message);
        }

        this.setDataCollection(data.items);
        return data.items;
      })
    );
  }

  encodeValueToUri(value: string): string{
    return encodeURIComponent(value);
  }

  searchMoreResults(results: Observable<any>): Observable<any> {
    return results.pipe(
      expand((data: any) => {
        console.log('expand', data);

        if (this.stopRequestQueue) {
          this.stopRequestQueue = false;
          return EMPTY;
        }

        if (this.dataCollection$.value.length === data.total_count) {
          return EMPTY;
        }

        this.pagesCounter++;

        const url = this.getUrl();

        return this.getDataFromApi(url)
        .pipe(
          delay(1000)
        );
      }),
      scan((accumulator: any, data: any) => {
        console.log('Scan', data);
        return [...accumulator, ...data.items];
      }, []),
    );
  }

  setDataCollection(data: IItem[]): void {
    this.dataCollection$.next(data);
  }

  cancelQueue(): void {
    this.stopRequestQueue = true;
    this.pagesCounter = 0;
  }

  getUrl(): string {
    return this.apiUrl + '?q=' + 
      this.encodeValueToUri(this.valueToSearch) + 
      '&page=' + 
      this.pagesCounter;
  }

}
