import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import '@elvia/elvis-badge';
import { BadgeDocComponent } from './badge-doc.component';
import { BadgeCegComponent } from './badge-ceg/badge-ceg.component';
import { ButtonBadgeCegComponent } from './button-badge-ceg/button-badge-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  imports: [SharedDocumentationModule],
  declarations: [BadgeDocComponent, BadgeCegComponent, ButtonBadgeCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BadgeDocModule {}
