import {
  Component,
  OnInit,
  Input,
  OnDestroy,
} from '@angular/core';
import {
  UntypedFormBuilder,
  Validators,
  UntypedFormGroup,
} from '@angular/forms';
import { SearchService } from '../../services/search/search.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Item } from '@modules/search/models/item.model';

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
  private subscriptions$ = new Subscription();

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

  setSearchFieldLiestener() {
    this.formSearch.get('search')?.valueChanges.subscribe((value) => {
      setTimeout(() => {
        this._searchService.setDataCollection([]);
        this.search(value);
      }, 500);
    });
  }

  search(value: string): void {
    this.loading = true;

    this.subscriptions$.add(
      this._searchService
        .search(value)
        .pipe(delay(500))
        .subscribe({
          error: (error) => {
            console.log(error);
            alert('An error has occurred. Please try again in some minutes.');
            this.cancelQueue();
          },
          complete: () => {
            this.cancelQueue();
          },
        })
    );
  }

  setDataCollection(data: Item[]): void {
    this._searchService.setDataCollection(data);
  }

  cancelQueue(): void {
    this.loading = false;
    this.requestSent = false;
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
