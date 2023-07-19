import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import '@elvia/elvis-datepicker';
import { DatepickerDocComponent } from './datepicker-doc.component';
import { DatepickerCegComponent } from './datepicker-ceg/datepicker-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  imports: [SharedDocumentationModule],
  declarations: [DatepickerDocComponent, DatepickerCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DatepickerDocModule {}
