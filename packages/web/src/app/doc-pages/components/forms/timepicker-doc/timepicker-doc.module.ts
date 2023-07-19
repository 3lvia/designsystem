import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TimepickerDocComponent } from './timepicker-doc.component';
import { TimepickerCegComponent } from './timepicker-ceg/timepicker-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  imports: [SharedDocumentationModule],
  declarations: [TimepickerDocComponent, TimepickerCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TimepickerDocModule {}
