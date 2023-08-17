import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CheckboxDocComponent } from './checkbox-doc.component';
import { CheckboxCegComponent } from './checkbox-ceg/checkbox-ceg.component';
import { CheckboxStandardCegComponent } from './checkbox-standard-ceg/checkbox-standard-ceg.component';
import { CheckboxNestedCegComponent } from './checkbox-nested-ceg/checkbox-nested-ceg.component';
import { CheckboxSizeCegComponent } from './checkbox-size-ceg/checkbox-size-ceg.component';
import { CheckboxStatesCegComponent } from './checkbox-states-ceg/checkbox-states-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  declarations: [
    CheckboxDocComponent,
    CheckboxCegComponent,
    CheckboxStandardCegComponent,
    CheckboxNestedCegComponent,
    CheckboxSizeCegComponent,
    CheckboxStatesCegComponent,
  ],
  imports: [SharedDocumentationModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CheckboxDocModule {}
