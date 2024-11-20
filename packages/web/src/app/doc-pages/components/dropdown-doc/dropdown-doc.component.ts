import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CegComponent } from '../../../shared/component-documentation/ceg/ceg.component';
import { StaticCegComponent } from '../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { WhenToUseComponent } from '../../../shared/when-to-use/when-to-use.component';
import { DropdownCegComponent } from './dropdown-ceg/dropdown-ceg.component';
import { dropdownData } from './dropdown-data';
import { DropdownEmptyCegComponent } from './dropdown-empty-ceg/dropdown-empty-ceg.component';
import { DropdownIconsCegComponent } from './dropdown-icons-ceg/dropdown-icons-ceg.component';
import { DropdownImagesCegComponent } from './dropdown-images-ceg/dropdown-images-ceg.component';
import { DropdownLoadMoreCegComponent } from './dropdown-load-more-ceg/dropdown-load-more-ceg.component';
import { DropdownStatusCegComponent } from './dropdown-status-ceg/dropdown-status-ceg.component';
import { DropdownTreeCegComponent } from './dropdown-tree-ceg/dropdown-tree-ceg.component';

@Component({
  selector: 'app-dropdown-doc',
  templateUrl: './dropdown-doc.component.html',
  styleUrls: ['./dropdown-doc.component.scss'],
  imports: [
    ComponentDocumentationComponent,
    CegComponent,
    DropdownCegComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    RouterLink,
    StaticCegComponent,
    DropdownIconsCegComponent,
    DropdownImagesCegComponent,
    DropdownTreeCegComponent,
    DropdownStatusCegComponent,
    DropdownLoadMoreCegComponent,
    DropdownEmptyCegComponent,
    WhenToUseComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DropdownDocComponent {
  componentData = dropdownData;
  does = [
    'Use dropdowns sparingly - only when the user has 5-15 options and you have limited space to display all options.',
  ];
  donts = [
    'Fewer than 5 options (consider radio filter or radio buttons)',
    'More than 15 options (consider autocomplete)',
  ];
}
