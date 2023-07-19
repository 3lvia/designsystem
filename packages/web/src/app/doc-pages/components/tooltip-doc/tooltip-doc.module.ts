import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TooltipDocComponent } from './tooltip-doc.component';
import { TooltipCegComponent } from './tooltip-ceg/tooltip-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';
import '@elvia/elvis-tooltip';

@NgModule({
  imports: [SharedDocumentationModule],
  declarations: [TooltipDocComponent, TooltipCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TooltipDocModule {}
