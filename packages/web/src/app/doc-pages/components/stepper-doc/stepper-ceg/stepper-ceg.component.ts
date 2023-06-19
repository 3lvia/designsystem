import { Component } from '@angular/core';
import { StepperProps } from '@elvia/elvis-stepper/react';
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
  stepperStates: StepperProps['steps'] = {
    '1': { heading: 'Title 1' },
    '2': { heading: 'Title 2' },
    '3': { heading: 'Title 3' },
    '4': { heading: 'Title 4' },
  };
  cegContent = new CegControlManager<StepperProps>([
    {
      type: 'Horizontal',
      controls: {
        isForced: {
          label: 'Forced',
          type: 'checkbox',
          value: false,
          group: 'Options',
        },
        completeButtonText: {
          type: 'text',
          value: 'Lagre',
          label: 'CompleteButtonText',
          group: 'Complete Button Text',
          inputType: 'input',
        },
      },
      staticProps: {
        steps: this.stepperStates,
      },
      groupOrder: ['Options', 'Complete Button Text'],
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
        completeButtonText: {
          type: 'text',
          value: 'Lagre',
          label: 'CompleteButtonText',
          group: 'Complete Button Text',
          inputType: 'input',
        },
      },
      staticProps: {
        steps: this.stepperStates,
      },
      groupOrder: ['Options', 'Complete Button Text'],
    },
  ]);
}
