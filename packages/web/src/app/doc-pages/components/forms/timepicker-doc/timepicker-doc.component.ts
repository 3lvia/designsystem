import { Component } from '@angular/core';
import { timepickerData } from './timepicker-data';
import { ComponentSubsectionComponent } from '../../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { ComponentSectionComponent } from '../../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { TimepickerCegComponent } from './timepicker-ceg/timepicker-ceg.component';
import { CegComponent } from '../../../../shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from '../../../../shared/component-documentation/component-documentation.component';

@Component({
    selector: 'app-timepicker-doc',
    templateUrl: './timepicker-doc.component.html',
    styleUrls: ['./timepicker-doc.component.scss'],
    standalone: true,
    imports: [
        ComponentDocumentationComponent,
        CegComponent,
        TimepickerCegComponent,
        ComponentSectionComponent,
        ComponentSubsectionComponent,
    ],
})
export class TimepickerDocComponent {
  componentData = timepickerData;
}
