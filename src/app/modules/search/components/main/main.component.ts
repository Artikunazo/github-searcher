import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { SearchService } from '@modules/search/services/search/search.service';
import { Item } from '@modules/search/models/item.model';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  public results: Item[] = [];
  public scrollChanged = new Subject<any>;

  private subscriptions$ = new Subscription();

  constructor(
    private _searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.subscriptions$.add(
      this._searchService.dataCollection$.subscribe({
        next: () => {
          this.results = this._searchService.dataCollection$.getValue();
        }
      })
    );
  }

  onScroll() {
    this._searchService.searchFromScroll();
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
