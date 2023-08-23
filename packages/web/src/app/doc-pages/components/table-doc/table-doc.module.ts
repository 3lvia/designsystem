import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TableDocComponent } from './table-doc.component';
import { TableCegComponent } from './table-ceg/table-ceg.component';
import { TableSizeMediumDesktopCegComponent } from './table-size-medium-desktop-ceg/table-size-medium-desktop-ceg.component';
import { TableSizeMediumMobileCegComponent } from './table-size-medium-mobile-ceg/table-size-medium-mobile-ceg.component';
import { TableSizeSmallDesktopCegComponent } from './table-size-small-desktop-ceg/table-size-small-desktop-ceg.component';
import { TableSizeSmallMobileCegComponent } from './table-size-small-mobile-ceg/table-size-small-mobile-ceg.component';
import { TableAlignmentCegComponent } from './table-alignment-ceg/table-alignment-ceg.component';
import { TableButtonDesktopCegComponent } from './table-button-desktop-ceg/table-button-desktop-ceg.component';
import { TableButtonMobileCegComponent } from './table-button-mobile-ceg/table-button-mobile-ceg.component';
import { TableCheckboxDesktopCegComponent } from './table-checkbox-desktop-ceg/table-checkbox-desktop-ceg.component';
import { TableCheckboxMobileCegComponent } from './table-checkbox-mobile-ceg/table-checkbox-mobile-ceg.component';
import { TableFootnoteCegComponent } from './table-footnote-ceg/table-footnote-ceg.component';
import { TableInputDesktopCegComponent } from './table-input-desktop-ceg/table-input-desktop-ceg.component';
import { TableInputMobileCegComponent } from './table-input-mobile-ceg/table-input-mobile-ceg.component';
import { TableLongColumnCegComponent } from './table-long-column-ceg/table-long-column-ceg.component';
import { TableStickyRowHeaderDesktopCegComponent } from './table-sticky-row-header-desktop-ceg/table-sticky-row-header-desktop-ceg.component';
import { TableStickyColumnHeaderDesktopCegComponent } from './table-sticky-column-header-desktop-ceg/table-sticky-column-header-desktop-ceg.component';
import { TableStickyColumnHeaderMobileCegComponent } from './table-sticky-column-header-mobile-ceg/table-sticky-column-header-mobile-ceg.component';
import { TableNoStripesCegComponent } from './table-no-stripes-ceg/table-no-stripes-ceg.component';
import { TableNumbersCegComponent } from './table-numbers-ceg/table-numbers-ceg.component';
import { TableSelectDesktopCegComponent } from './table-select-desktop-ceg/table-select-desktop-ceg.component';
import { TableSelectMobileCegComponent } from './table-select-mobile-ceg/table-select-mobile-ceg.component';
import { TableValidationRowCegComponent } from './table-validation-row-ceg/table-validation-row-ceg.component';
import { TableValidationCellCegComponent } from './table-validation-cell-ceg/table-validation-cell-ceg.component';
import '@elvia/elvis-tooltip';
import '@elvia/elvis-accordion';
import '@elvia/elvis-divider';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  declarations: [
    TableDocComponent,
    TableCegComponent,
    TableSizeMediumDesktopCegComponent,
    TableSizeMediumMobileCegComponent,
    TableSizeSmallDesktopCegComponent,
    TableSizeSmallMobileCegComponent,
    TableAlignmentCegComponent,
    TableButtonDesktopCegComponent,
    TableButtonMobileCegComponent,
    TableCheckboxDesktopCegComponent,
    TableCheckboxMobileCegComponent,
    TableFootnoteCegComponent,
    TableInputDesktopCegComponent,
    TableInputMobileCegComponent,
    TableLongColumnCegComponent,
    TableStickyRowHeaderDesktopCegComponent,
    TableStickyColumnHeaderDesktopCegComponent,
    TableStickyColumnHeaderMobileCegComponent,
    TableNoStripesCegComponent,
    TableNumbersCegComponent,
    TableSelectDesktopCegComponent,
    TableSelectMobileCegComponent,
    TableValidationRowCegComponent,
    TableValidationCellCegComponent,
  ],
  imports: [SharedDocumentationModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TableDocModule {}
