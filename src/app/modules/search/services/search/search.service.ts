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

  private apiUrl = environment.apiUrl;
  private pagesCounter: number = 0;
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

    return this.getDataFromApi(url)
    .pipe(
      map((data: IResponseAPI) => {
        
        if(data.errors){
          return throwError(() => data.message);
        }

        const results = [...this.dataCollection$.getValue(), ...data.items];
        this.setDataCollection(results);
        return results;
      })
    );
  }

  encodeValueToUri(value: string): string{
    return encodeURIComponent(value);
  }

  setDataCollection(data: IItem[]): void {
    this.dataCollection$.next(data);
  }

  getUrl(): string {
    this.pagesCounter++;

    return this.apiUrl + '?q=' +
      this.encodeValueToUri(this.valueToSearch) +
      '&page=' +
      this.pagesCounter;
  }

}
