import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import { CegComponent } from '../../../shared/component-documentation/ceg/ceg.component';
import { StaticCegComponent } from '../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { WhenToUseComponent } from '../../../shared/when-to-use/when-to-use.component';
import { RadioFilterCegComponent } from './radio-filter-ceg/radio-filter-ceg.component';
import { RadioFilterIconCegComponent } from './radio-filter-icon-ceg/radio-filter-icon-ceg.component';
import { radioFilterData } from './radio-filter.data';

@Component({
  selector: 'app-radio-filter-doc',
  templateUrl: './radio-filter-doc.component.html',
  styleUrls: ['./radio-filter-doc.component.scss'],
  imports: [
    ComponentDocumentationComponent,
    CegComponent,
    RadioFilterCegComponent,
    ComponentSectionComponent,
    WhenToUseComponent,
    ComponentSubsectionComponent,
    StaticCegComponent,
    RadioFilterIconCegComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RadioFilterDocComponent {
  componentData = radioFilterData;

  whens = [
    'Filter/toggle between different views of same content',
    'When you want to have all options visible at all times and not hidden in a dropdown.',
  ];
  whenNots = ['Toggle between different content (then use tabs or segmented control instead)'];
}
