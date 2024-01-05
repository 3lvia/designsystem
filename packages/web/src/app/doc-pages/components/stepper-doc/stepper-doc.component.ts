import { Component } from '@angular/core';
import { stepperData } from './stepper-data';

@Component({
  selector: 'app-stepper-doc',
  templateUrl: './stepper-doc.component.html',
  styleUrls: ['./stepper-doc.component.scss'],
})
export class StepperDocComponent {
  componentData = stepperData;
  does = stepperData.does;
  donts = stepperData.donts;
}
