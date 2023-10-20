import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ChipDocComponent } from './chip-doc.component';
import '@elvia/elvis-chip';
import { ChipCegComponent } from './chip-ceg/chip-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';
import { ChipImageCegComponent } from './chip-image-ceg/chip-image-ceg.component';
import { ChipImageEmptyCegComponent } from './chip-image-empty-ceg/chip-image-empty-ceg.component';

@NgModule({
  imports: [SharedDocumentationModule],
  declarations: [ChipDocComponent, ChipCegComponent, ChipImageCegComponent, ChipImageEmptyCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChipDocModule {}
