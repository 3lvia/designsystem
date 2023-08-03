import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AutocompleteCegComponent } from './autocomplete-ceg/autocomplete-ceg.component';
import { AutocompleteDocComponent } from './autocomplete-doc.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';
import { AutocompleteLabelCegComponent } from './autocomplete-label-ceg/autocomplete-label-ceg.component';
import '@elvia/elvis-autocomplete';

@NgModule({
  imports: [SharedDocumentationModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AutocompleteDocComponent, AutocompleteCegComponent, AutocompleteLabelCegComponent],
})
export class AutocompleteDocModule {}
