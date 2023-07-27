import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SpotlightDocComponent } from './spotlight-doc.component';
import { SpotlightCegComponent } from './spotlight-ceg/spotlight-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';
import '@elvia/elvis-spotlight';

@NgModule({
  imports: [SharedDocumentationModule],
  declarations: [SpotlightDocComponent, SpotlightCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SpotlightDocModule {}
