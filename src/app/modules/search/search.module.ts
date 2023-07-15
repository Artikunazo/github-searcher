import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module'
import { MainComponent } from './components/main/main.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchRoutingModule } from './search-routing.module';
import { MaterialModule } from "../material/material.module";
import { InfiniteScrollModule } from "ngx-infinite-scroll";

@NgModule({
  declarations: [
    MainComponent,
    SearchBarComponent,
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    InfiniteScrollModule
  ]
})
export class SearchModule { }
