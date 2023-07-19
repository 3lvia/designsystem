import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TabsDocComponent } from './tabs-doc.component';
import { TabsCegComponent } from './tabs-ceg/tabs-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';
import '@elvia/elvis-tabs';

@NgModule({
  imports: [SharedDocumentationModule],
  declarations: [TabsDocComponent, TabsCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TabsDocModule {}
