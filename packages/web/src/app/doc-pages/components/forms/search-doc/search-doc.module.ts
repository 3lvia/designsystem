import { NgModule } from '@angular/core';
import { SearchDocComponent } from './search-doc.component';
import { SearchCegComponent } from './search-ceg/search-ceg.component';
import { SearchInstantCegComponent } from './search-instant-ceg/search-instant-ceg.component';
import { SearchInstantSearchedCegComponent } from './search-instant-searched-ceg/search-instant-searched-ceg.component';
import { SearchOnSubmitCegComponent } from './search-on-submit-ceg/search-on-submit-ceg.component';
import { SearchOnSubmitSearchedCegComponent } from './search-on-submit-searched-ceg/search-on-submit-searched-ceg.component';
import { SearchFullwidthCegComponent } from './search-fullwidth-ceg/search-fullwidth-ceg.component';
import { SearchSizeMediumCegComponent } from './search-size-medium-ceg/search-size-medium-ceg.component';
import { SearchSizeSmallCegComponent } from './search-size-small-ceg/search-size-small-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  declarations: [
    SearchDocComponent,
    SearchCegComponent,
    SearchInstantCegComponent,
    SearchInstantSearchedCegComponent,
    SearchOnSubmitCegComponent,
    SearchOnSubmitSearchedCegComponent,
    SearchFullwidthCegComponent,
    SearchSizeMediumCegComponent,
    SearchSizeSmallCegComponent,
  ],
  imports: [SharedDocumentationModule],
})
export class SearchDocModule {}
