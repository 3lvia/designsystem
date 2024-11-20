import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import { CegComponent } from '../../../../shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from '../../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { TimepickerCegComponent } from './timepicker-ceg/timepicker-ceg.component';
import { timepickerData } from './timepicker-data';

@Component({
  selector: 'app-timepicker-doc',
  templateUrl: './timepicker-doc.component.html',
  styleUrls: ['./timepicker-doc.component.scss'],
  imports: [
    ComponentDocumentationComponent,
    CegComponent,
    TimepickerCegComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TimepickerDocComponent {
  componentData = timepickerData;
}
