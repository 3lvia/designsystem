import { AutocompleteCegComponent } from './autocomplete-ceg/autocomplete-ceg.component';
import { AutocompleteDocComponent } from './autocomplete-doc.component';
import { AutocompleteFilterCegComponent } from './autocomplete-filter-ceg/autocomplete-filter-ceg.component';
import { AutocompleteLabelCegComponent } from './autocomplete-label-ceg/autocomplete-label-ceg.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';
import '@elvia/elvis-autocomplete';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [SharedDocumentationModule, HttpClientModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AutocompleteCegComponent,
    AutocompleteDocComponent,
    AutocompleteFilterCegComponent,
    AutocompleteLabelCegComponent,
  ],
})
export class AutocompleteDocModule {}
