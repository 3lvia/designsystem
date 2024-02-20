import { Component } from '@angular/core';
import { datepickerRangeData } from './datepicker-range-data';
import { DatepickerRangeShortcutExampleComponent } from './datepicker-range-shortcut-example/datepicker-range-shortcut-example.component';
import { RouterLink } from '@angular/router';
import { ComponentSubsectionComponent } from '../../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { ComponentSectionComponent } from '../../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { DatepickerRangeCegComponent } from './datepicker-range-ceg/datepicker-range-ceg.component';
import { CegComponent } from '../../../../shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from '../../../../shared/component-documentation/component-documentation.component';

@Component({
  selector: 'app-datepicker-range-doc',
  templateUrl: './datepicker-range-doc.component.html',
  styleUrls: ['./datepicker-range-doc.component.scss'],
  standalone: true,
  imports: [
    ComponentDocumentationComponent,
    CegComponent,
    DatepickerRangeCegComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    RouterLink,
    DatepickerRangeShortcutExampleComponent,
  ],
})
export class DatepickerRangeDocComponent {
  componentData = datepickerRangeData;
}
