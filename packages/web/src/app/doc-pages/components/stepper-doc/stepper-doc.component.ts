import { Component } from '@angular/core';
import { stepperData } from './stepper-data';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { WhenToUseComponent } from '../../../shared/when-to-use/when-to-use.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { StepperCegComponent } from './stepper-ceg/stepper-ceg.component';
import { CegComponent } from '../../../shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';

@Component({
  selector: 'app-stepper-doc',
  templateUrl: './stepper-doc.component.html',
  styleUrls: ['./stepper-doc.component.scss'],
  standalone: true,
  imports: [
    ComponentDocumentationComponent,
    CegComponent,
    StepperCegComponent,
    ComponentSectionComponent,
    WhenToUseComponent,
    ComponentSubsectionComponent,
  ],
})
export class StepperDocComponent {
  componentData = stepperData;
  does = stepperData.does;
  donts = stepperData.donts;
}
