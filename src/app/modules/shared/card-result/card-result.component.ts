import {
  Component,
  OnInit,
  Input,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IItem } from '@modules/search/models/item.model';

@Component({
  selector: 'card-result',
  templateUrl: './card-result.component.html',
  styleUrls: ['./card-result.component.css'],
})
export class CardResultComponent implements OnInit, OnDestroy {
  @Input() result!: IItem;

  private _subscriptions = new Subscription();

  constructor() { }

  ngOnInit(): void {
   
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
