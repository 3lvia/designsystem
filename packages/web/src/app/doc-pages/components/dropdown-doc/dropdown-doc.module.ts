import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import '@elvia/elvis-dropdown';
import { DropdownDocComponent } from './dropdown-doc.component';
import { DropdownCegComponent } from './dropdown-ceg/dropdown-ceg.component';
import { DropdownIconsCegComponent } from './dropdown-icons-ceg/dropdown-icons-ceg.component';
import { DropdownImagesCegComponent } from './dropdown-images-ceg/dropdown-images-ceg.component';
import { DropdownTreeCegComponent } from './dropdown-tree-ceg/dropdown-tree-ceg.component';
import { DropdownLoadMoreCegComponent } from './dropdown-load-more-ceg/dropdown-load-more-ceg.component';
import { DropdownStatusCegComponent } from './dropdown-status-ceg/dropdown-status-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';
import { DropdownEmptyCegComponent } from './dropdown-empty-ceg/dropdown-empty-ceg.component';

@NgModule({
  imports: [
    SharedDocumentationModule,
    DropdownDocComponent,
    DropdownCegComponent,
    DropdownIconsCegComponent,
    DropdownImagesCegComponent,
    DropdownTreeCegComponent,
    DropdownLoadMoreCegComponent,
    DropdownStatusCegComponent,
    DropdownEmptyCegComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DropdownDocModule {}
