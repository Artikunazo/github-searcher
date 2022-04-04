import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { SearchService } from '@modules/search/services/search/search.service';
import { Observable, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'card-result',
  templateUrl: './card-result.component.html',
  styleUrls: ['./card-result.component.css'],
})
export class CardResultComponent implements OnInit, OnDestroy {
  @Input() result!: any;

  public episode!: any;
  public moreInfo: boolean = false;
  public characters: any = [];
  public characterCompare!: FormControl;
  public loading: boolean = false;

  private _subscriptions = new Subscription();

  constructor(
    private _searchService: SearchService,
    private _formBuilder: FormBuilder
  ) {
    // Init checkbox for compare characters
    this.characterCompare = this._formBuilder.control(false);
  }

  ngOnInit(): void {
    // Read episodes of a character
    // if (this.typeSearch === 'characters') {
    //   this.searchEpisodes();
    //   this.checkboxListenerInit();
    // }
  }

  private checkboxListenerInit() {
    // Listener compare checkbox action
    this._subscriptions.add(
      this.characterCompare.valueChanges.subscribe({
        next: (value) => {
          // this.compareEvent.emit({
          //   character: this.result,
          //   value: value,
          // });
        },
      })
    );
  }

  toggleMoreInfo(): void {
    this.moreInfo = !this.moreInfo;
    if (this.moreInfo) {
      this.result.characters.forEach((character: string) => {
        this._subscriptions.add(
          this.getDataFromApi(character)
            .subscribe((characterData) => {
              this.characters.push(characterData as any);
              this.loading = false;
            })
        );
      });
    }
  }

  getDataFromApi(url: string): Observable<any> {
    this.loading = true;
    return this._searchService.getDataFromApi(url).pipe(delay(500));
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
