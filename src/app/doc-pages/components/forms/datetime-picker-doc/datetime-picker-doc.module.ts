import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatetimePickerDocComponent } from './datetime-picker-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';
import { RouterModule } from '@angular/router';
import { CodeBlockModule } from 'src/app/shared/code-block/code-block.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    RouterModule,
    CodeBlockModule,
  ],
  declarations: [DatetimePickerDocComponent],
})
export class DatetimePickerDocModule { }
