import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ChipDocComponent } from './chip-doc.component';
import '@elvia/elvis-chip';
import { ChipCegComponent } from './chip-ceg/chip-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  imports: [SharedDocumentationModule],
  declarations: [ChipDocComponent, ChipCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChipDocModule {}
