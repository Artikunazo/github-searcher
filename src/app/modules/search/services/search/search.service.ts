import { Injectable } from '@angular/core';
import { ConnectorService } from '@core/services/connector/connector.service';
import { environment } from '@environments/environment';
import { IItem } from '@modules/search/models/item.mode';
import { Observable, EMPTY, throwError } from 'rxjs';
import {
  map,
  delay,
} from 'rxjs/operators';
import { IResponseAPI } from '../../models/response-api.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {  
  private apiUrl = environment.apiUrl;

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

    const url = this.apiUrl + '?q=' + this.encodeValueToUri(value);

    return this.getDataFromApi(url).pipe(
      map((data: IResponseAPI) => {

        if(data.errors){
          throwError(() => data.message);
        }

        return data.items;
      })
    );
  }

  encodeValueToUri(value: string): string{
    return encodeURIComponent(value);
  }

}
