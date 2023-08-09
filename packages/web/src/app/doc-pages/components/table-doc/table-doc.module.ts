import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.module';
import { TableDocComponent } from './table-doc.component';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { TableCegComponent } from './table-ceg/table-ceg.component';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { TableSizeNormalDesktopCegComponent } from './table-size-normal-desktop-ceg/table-size-normal-desktop-ceg.component';
import { TableSizeNormalMobileCegComponent } from './table-size-normal-mobile-ceg/table-size-normal-mobile-ceg.component';
import { TableSizeCompactDesktopCegComponent } from './table-size-compact-desktop-ceg/table-size-compact-desktop-ceg.component';
import { TableSizeCompactMobileCegComponent } from './table-size-compact-mobile-ceg/table-size-compact-mobile-ceg.component';
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
    TableSizeNormalDesktopCegComponent,
    TableSizeNormalMobileCegComponent,
    TableSizeCompactDesktopCegComponent,
    TableSizeCompactMobileCegComponent,
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
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentPropertiesModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
    WhenToUseModule,
    RouterModule,
    ComponentChangelogModule,
    CegModule,
    SharedDocumentationModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TableDocModule {}
