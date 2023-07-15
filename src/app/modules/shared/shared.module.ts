import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { CardResultComponent } from './card-result/card-result.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module'

@NgModule({
  declarations: [
    SpinnerComponent,
    CardResultComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    SpinnerComponent,
    CardResultComponent
  ]
})
export class SharedModule { }
