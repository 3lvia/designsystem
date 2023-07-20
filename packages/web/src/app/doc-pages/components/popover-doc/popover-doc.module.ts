import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import '@elvia/elvis-popover';
import { PopoverDocComponent } from './popover-doc.component';
import { PopoverCegComponent } from './popover-ceg/popover-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  imports: [SharedDocumentationModule],
  declarations: [PopoverDocComponent, PopoverCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PopoverDocModule {}
