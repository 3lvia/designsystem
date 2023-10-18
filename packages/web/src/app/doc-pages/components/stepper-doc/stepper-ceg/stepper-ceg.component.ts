import { Component } from '@angular/core';
import { BaseStepperProps } from '@elvia/elvis-stepper/react';
import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';

interface StepState {
  title: string;
  isError: boolean;
  isCompleted: boolean;
}
interface StepStates {
  [step: number]: Partial<StepState>;
}

@Component({
  selector: 'app-stepper-ceg',
  templateUrl: './stepper-ceg.component.html',
  styleUrls: ['./stepper-ceg.component.scss'],
  providers: [{ provide: ComponentExample, useExisting: StepperCegComponent }],
})
export class StepperCegComponent implements ComponentExample {
  elementName = 'stepper';
  stepperStates: BaseStepperProps['steps'] = {
    '1': { heading: 'Tittel 1', isCompleted: true },
    '2': { heading: 'Tittel 2', isCompleted: true },
    '3': { heading: 'Tittel 3' },
    '4': { heading: 'Tittel 4', nextButtonText: 'Lagre' },
  };
  cegContent = new CegControlManager<BaseStepperProps>([
    {
      type: 'Horizontal',
      controls: {
        isForced: {
          label: 'Forced',
          type: 'checkbox',
          value: false,
          group: 'Options',
        },
      },
      staticProps: {
        steps: this.stepperStates,
      },
      groupOrder: ['Options'],
    },
    {
      type: 'Vertical',
      controls: {
        isForced: {
          label: 'Forced',
          type: 'checkbox',
          value: false,
          group: 'Options',
        },
      },
      staticProps: {
        steps: this.stepperStates,
      },
      groupOrder: ['Options'],
    },
  ]);
}
