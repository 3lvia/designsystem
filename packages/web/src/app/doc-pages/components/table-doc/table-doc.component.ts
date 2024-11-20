import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { StaticCegComponent } from '../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { ComponentSubsubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.component';
import { WhenToUseComponent } from '../../../shared/when-to-use/when-to-use.component';
import { TableAlignmentCegComponent } from './table-alignment-ceg/table-alignment-ceg.component';
import { TableButtonDesktopCegComponent } from './table-button-desktop-ceg/table-button-desktop-ceg.component';
import { TableButtonMobileCegComponent } from './table-button-mobile-ceg/table-button-mobile-ceg.component';
import { TableCegComponent } from './table-ceg/table-ceg.component';
import { TableCheckboxDesktopCegComponent } from './table-checkbox-desktop-ceg/table-checkbox-desktop-ceg.component';
import { TableCheckboxMobileCegComponent } from './table-checkbox-mobile-ceg/table-checkbox-mobile-ceg.component';
import { TableExtraInformationPopoverCegComponent } from './table-detailed-information-popover-ceg/table-detailed-information-popover-ceg.component';
import { TableExtraInformationTooltipCegComponent } from './table-detailed-information-tooltip-ceg/table-detailed-information-tooltip-ceg.component';
import { TableFootnoteCegComponent } from './table-footnote-ceg/table-footnote-ceg.component';
import { TableInputDesktopCegComponent } from './table-input-desktop-ceg/table-input-desktop-ceg.component';
import { TableInputMobileCegComponent } from './table-input-mobile-ceg/table-input-mobile-ceg.component';
import { TableLongColumnCegComponent } from './table-long-column-ceg/table-long-column-ceg.component';
import { TableNoStripesCegComponent } from './table-no-stripes-ceg/table-no-stripes-ceg.component';
import { TableNumbersCegComponent } from './table-numbers-ceg/table-numbers-ceg.component';
import { TableSelectDesktopCegComponent } from './table-select-desktop-ceg/table-select-desktop-ceg.component';
import { TableSelectMobileCegComponent } from './table-select-mobile-ceg/table-select-mobile-ceg.component';
import { TableSizeMediumDesktopCegComponent } from './table-size-medium-desktop-ceg/table-size-medium-desktop-ceg.component';
import { TableSizeMediumMobileCegComponent } from './table-size-medium-mobile-ceg/table-size-medium-mobile-ceg.component';
import { TableSizeSmallDesktopCegComponent } from './table-size-small-desktop-ceg/table-size-small-desktop-ceg.component';
import { TableSizeSmallMobileCegComponent } from './table-size-small-mobile-ceg/table-size-small-mobile-ceg.component';
import { TableStickyColumnHeaderDesktopCegComponent } from './table-sticky-column-header-desktop-ceg/table-sticky-column-header-desktop-ceg.component';
import { TableStickyColumnHeaderMobileCegComponent } from './table-sticky-column-header-mobile-ceg/table-sticky-column-header-mobile-ceg.component';
import { TableStickyRowHeaderDesktopCegComponent } from './table-sticky-row-header-desktop-ceg/table-sticky-row-header-desktop-ceg.component';
import { TableValidationCellCegComponent } from './table-validation-cell-ceg/table-validation-cell-ceg.component';
import { TableValidationRowCegComponent } from './table-validation-row-ceg/table-validation-row-ceg.component';

@Component({
  selector: 'app-table-doc',
  templateUrl: './table-doc.component.html',
  styleUrls: ['./table-doc.component.scss'],
  imports: [
    ComponentDocumentationComponent,
    StaticCegComponent,
    TableCegComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    ComponentSubsubsectionComponent,
    TableSizeMediumDesktopCegComponent,
    TableSizeMediumMobileCegComponent,
    TableSizeSmallDesktopCegComponent,
    TableSizeSmallMobileCegComponent,
    TableAlignmentCegComponent,
    TableButtonDesktopCegComponent,
    TableButtonMobileCegComponent,
    RouterLink,
    TableCheckboxDesktopCegComponent,
    TableCheckboxMobileCegComponent,
    TableExtraInformationTooltipCegComponent,
    TableExtraInformationPopoverCegComponent,
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
    WhenToUseComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TableDocComponent {
  does = ['Tables should be used when displaying large amounts of data to the user.'];
  donts = [
    'Don’t use a table when you can use a data visualization.',
    'Don’t mix different styles of tables on the same page.',
  ];
}
