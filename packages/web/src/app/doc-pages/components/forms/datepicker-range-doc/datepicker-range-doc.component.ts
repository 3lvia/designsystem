import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CegComponent } from '../../../../shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from '../../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { DatepickerRangeCegComponent } from './datepicker-range-ceg/datepicker-range-ceg.component';
import { datepickerRangeData } from './datepicker-range-data';
import { DatepickerRangeShortcutExampleComponent } from './datepicker-range-shortcut-example/datepicker-range-shortcut-example.component';

@Component({
  selector: 'app-datepicker-range-doc',
  templateUrl: './datepicker-range-doc.component.html',
  styleUrls: ['./datepicker-range-doc.component.scss'],
  imports: [
    ComponentDocumentationComponent,
    CegComponent,
    DatepickerRangeCegComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    RouterLink,
    DatepickerRangeShortcutExampleComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DatepickerRangeDocComponent {
  componentData = datepickerRangeData;
}
