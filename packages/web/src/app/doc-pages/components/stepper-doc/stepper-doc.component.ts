import { Component } from '@angular/core';
import { stepperData } from './stepper-data';
import { configurationProps } from './stepper-configuration-props';

@Component({
  selector: 'app-stepper-doc',
  templateUrl: './stepper-doc.component.html',
  styleUrls: ['./stepper-doc.component.scss'],
})
export class StepperDocComponent {
  componentData = stepperData;
  stepperConfigurationProps = configurationProps;
  does = stepperData.does;
  donts = stepperData.donts;
}
