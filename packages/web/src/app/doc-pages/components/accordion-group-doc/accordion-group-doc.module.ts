import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AccordionGroupDocComponent } from './accordion-group-doc.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  imports: [SharedDocumentationModule],
  declarations: [AccordionGroupDocComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccordionGroupDocModule {}
