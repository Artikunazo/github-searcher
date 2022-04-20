import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from '@modules/search/services/search/search.service';
import { IItem } from '@modules/search/models/item.model';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  public results: IItem[] = [];

  private _subscriptions = new Subscription();

  constructor(
    private _searchService: SearchService
  ) {}

  ngOnInit(): void {
    this._subscriptions.add(
      this._searchService.dataCollection$.subscribe({
        next: () => {
          this.results = this._searchService.dataCollection$.getValue();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
