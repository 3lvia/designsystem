import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import '@elvia/elvis-carousel';
import { CarouselCegComponent } from './carousel-ceg/carousel-ceg.component';
import { CarouselDocComponent } from './carousel-doc.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  imports: [SharedDocumentationModule],
  declarations: [CarouselDocComponent, CarouselCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselDocModule {}
