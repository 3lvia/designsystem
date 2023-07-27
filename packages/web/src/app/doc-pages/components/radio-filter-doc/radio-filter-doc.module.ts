import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RadioFilterDocComponent } from './radio-filter-doc.component';
import { RadioFilterCegComponent } from './radio-filter-ceg/radio-filter-ceg.component';
import { RadioFilterIconCegComponent } from './radio-filter-icon-ceg/radio-filter-icon-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';
import '@elvia/elvis-radio-filter';

@NgModule({
  imports: [SharedDocumentationModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [RadioFilterDocComponent, RadioFilterCegComponent, RadioFilterIconCegComponent],
})
export class RadioFilterDocModule {}
