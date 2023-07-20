import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AccordionDocComponent } from './accordion-doc.component';
import { AccordionCegComponent } from './accordion-ceg/accordion-ceg.component';
import { AccordionGroupCegComponent } from './accordion-group-ceg/accordion-group-ceg.component';
import '@elvia/elvis-accordion';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  imports: [SharedDocumentationModule],
  declarations: [AccordionDocComponent, AccordionCegComponent, AccordionGroupCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccordionDocModule {}
