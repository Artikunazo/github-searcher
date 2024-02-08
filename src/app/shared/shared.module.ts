import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpinnerComponent} from './spinner/spinner.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';

@NgModule({
	declarations: [SpinnerComponent],
	imports: [CommonModule, ReactiveFormsModule, MaterialModule],
	exports: [SpinnerComponent],
})
export class SharedModule {}
