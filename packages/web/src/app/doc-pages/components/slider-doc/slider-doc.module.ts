import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SliderDocComponent } from './slider-doc.component';
import { SliderCegComponent } from './slider-ceg/slider-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';
import '@elvia/elvis-slider';

@NgModule({
  imports: [SharedDocumentationModule],
  declarations: [SliderDocComponent, SliderCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SliderDocModule {}
