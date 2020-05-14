import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatetimePickerDocComponent } from './datetime-picker-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule
  ],
  declarations: [DatetimePickerDocComponent]
})
export class DatetimePickerDocModule { }
