import { Component } from '@angular/core';

import { CegComponent } from '../../../../shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from '../../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { DatepickerCegComponent } from './datepicker-ceg/datepicker-ceg.component';
import { datepickerData } from './datepicker-data';

@Component({
  selector: 'app-datepicker-doc',
  templateUrl: './datepicker-doc.component.html',
  styleUrls: ['./datepicker-doc.component.scss'],
  standalone: true,
  imports: [
    ComponentDocumentationComponent,
    CegComponent,
    DatepickerCegComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
  ],
})
export class DatepickerDocComponent {
  date = new Date(2021, 4, 20);
  date2 = new Date(2022, 0, 15);
  componentData = datepickerData;
}
