import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from 'src/app/shared/shared.module';
import {MainComponent} from './main/main.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {SearchRoutingModule} from './search-routing.module';
import {MaterialModule} from '../material/material.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {CardResultComponent} from './card-result/card-result.component';

@NgModule({
	declarations: [MainComponent, SearchBarComponent, CardResultComponent],
	imports: [
		CommonModule,
		SearchRoutingModule,
		HttpClientModule,
		ReactiveFormsModule,
		SharedModule,
		MaterialModule,
		InfiniteScrollModule,
	],
})
export class SearchModule {}
