import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import '@elvia/elvis-card';
import { CardDocComponent } from './card-doc.component';
import { CardCegComponent } from './card-ceg/card-ceg.component';
import { CardLinksCegComponent } from './card-links-ceg/card-links-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  imports: [SharedDocumentationModule],
  declarations: [CardDocComponent, CardCegComponent, CardLinksCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CardDocModule {}
