import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import '@elvia/elvis-pagination';
import { PaginationDocComponent } from './pagination-doc.component';
import { PaginationCegComponent } from './pagination-ceg/pagination-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  imports: [SharedDocumentationModule],
  declarations: [PaginationDocComponent, PaginationCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PaginationDocModule {}
