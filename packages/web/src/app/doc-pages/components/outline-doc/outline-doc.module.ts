import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { OutlineDocComponent } from './outline-doc.component';
import { OutlineCegComponent } from './outline-ceg/outline-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  imports: [SharedDocumentationModule],
  declarations: [OutlineDocComponent, OutlineCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OutlineDocModule {}
