import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import '@elvia/elvis-box';
import { BoxCegComponent } from './box-ceg/box-ceg.component';
import { BoxDocComponent } from './box-doc.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  imports: [SharedDocumentationModule],
  declarations: [BoxDocComponent, BoxCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BoxDocModule {}
