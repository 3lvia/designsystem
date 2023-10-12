import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import '@elvia/elvis-datepicker-range';
import { DatepickerRangeDocComponent } from './datepicker-range-doc.component';
import { DatepickerRangeCegComponent } from './datepicker-range-ceg/datepicker-range-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';
import { DatepickerRangeShortcutExampleComponent } from './datepicker-range-shortcut-example/datepicker-range-shortcut-example.component';

@NgModule({
  imports: [SharedDocumentationModule],
  declarations: [
    DatepickerRangeDocComponent,
    DatepickerRangeCegComponent,
    DatepickerRangeShortcutExampleComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DatepickerRangeDocModule {}
