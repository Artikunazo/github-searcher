import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SearchService } from '../../services/search/search.service';
import { Subscription, EMPTY, Observable } from 'rxjs';
import { IItem } from '@modules/search/models/item.mode';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit, OnDestroy {

  @Output() results = new EventEmitter();

  public typeSearchList: string[] = [];
  public formSearch: FormGroup;
  public loading: boolean = false;

  private _subscriptions = new Subscription();

  constructor(
    private _formBuilder: FormBuilder,
    private _searchService: SearchService
  ) {
    this.formSearch = this._formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.setSearchFieldLiestener();
  }

  setSearchFieldLiestener(){
    this.formSearch.get('name')?.
    valueChanges.subscribe((value) => {
      this.search(value);
    });
  }

  search(value: string): void {
    this.loading = true;
    
    this._subscriptions.add(
      this.sendRequest(value).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.loading = false;
        }
      })
    );
  }

  sendRequest(value: string): Observable<Object | IItem[]> {
    if(!value){
      return EMPTY;
    }

    return this._searchService.search(value);
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
