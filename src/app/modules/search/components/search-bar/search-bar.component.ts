import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, HostListener } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { SearchService } from '../../services/search/search.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IItem } from '@modules/search/models/item.model';

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
  private _subscriptions = new Subscription();

  constructor(
    private _formBuilder: UntypedFormBuilder,
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
     setTimeout(() => {
      this._searchService.setDataCollection([]);
      this.search(value);
     }, 500);
    });
  }

  search(value: string): void {
    this.loading = true;

    this._subscriptions.add(
      this._searchService.search(value)
      .pipe(delay(500)).subscribe({
        error: (error) => {
          console.log(error);
          alert('An error has occurred. Please try again in some minutes.');
          this.cancelQueue();
        },
        complete: () => {
          this.cancelQueue();
        }
      })
    );
  }

  setDataCollection(data: IItem[]): void{
    this._searchService.setDataCollection(data);
  }

  cancelQueue(): void {
    this.loading = false;
    this.requestSent = false;
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  @HostListener('document:scroll', ['$event'])
  onScroll(event: any): void {
    const scroll = event.target.scrollingElement.scrollTop;
    const totalHeight = event.target.scrollingElement.scrollHeight;

    // it gets at least half of all scroll height
    const scrollValidation = totalHeight / 2;

    if(scroll >= scrollValidation && !this.requestSent){
      this.requestSent = true;
      this.search(this.formSearch.get('search')?.value);
    }

  }
}
