import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AccordionDocComponent } from './accordion-doc.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';
import '@elvia/elvis-accordion';

@NgModule({
  imports: [SharedDocumentationModule],
  declarations: [AccordionDocComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccordionDocModule {}
