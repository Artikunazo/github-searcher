import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from '@modules/search/services/search/search.service';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {
  public results = [];
  public typeSearch: string = '';
  public charactersToCompare: any = [];
  public showCompare: boolean = false;

  private _subscriptions = new Subscription();

  constructor(
    private _searchService: SearchService
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._subscriptions.add(
      this._searchService.dataCollection.subscribe({
        next: (data: any) => {
          this.results = data;
        }
      })
    );
  }

  getTypeSearch(typeSelected: any): void {
    this.typeSearch = typeSelected as string;
  }

  toggleCompareContainer(): void {
    this.showCompare = !this.showCompare;
  }

  ngOnDestroy(): void {
    this.results = [];
    this._subscriptions.unsubscribe();
  }
}
