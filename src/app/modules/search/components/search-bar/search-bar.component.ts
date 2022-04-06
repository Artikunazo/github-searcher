import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SearchService } from '../../services/search/search.service';
import { Subscription, EMPTY, Observable } from 'rxjs';
import { IItem } from '@modules/search/models/item.model';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit, OnDestroy {

  public typeSearchList: string[] = [];
  public formSearch: FormGroup;
  public loading: boolean = false;

  private _subscriptions = new Subscription();

  constructor(
    private _formBuilder: FormBuilder,
    private _searchService: SearchService
  ) {
    this.formSearch = this._formBuilder.group({
      search: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.setSearchFieldLiestener();
  }

  setSearchFieldLiestener(){
    this.formSearch.get('search')?.
    valueChanges.subscribe((value) => {
      this.search(value);
    });
  }

  search(value: string): void {
    this.loading = true;
    
    this._subscriptions.add(
      this._searchService.search(value).subscribe({
        next: (data: any) => {
         this.setDataCollection(data);
        },
        error: (error) => {
          console.log(error.message);
        },
        complete: () => {
          this.loading = false;
        }
      })
    );
  }

  setDataCollection(data: IItem[]): void{
    this._searchService.setDataCollection(data);
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
