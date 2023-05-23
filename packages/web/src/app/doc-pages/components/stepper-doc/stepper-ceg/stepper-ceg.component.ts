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
      groupOrder: ['Options', 'Complete Button Text'],
    },
  ]);

  stepperStates: StepStates = {
    '1': { title: 'Title 1' },
    '2': { title: 'Title 2' },
    '3': { title: 'Title 3' },
    '4': { title: 'Title 4' },
    '5': { title: 'Title 5' },
    '6': { title: 'Title 6' },
    '7': { title: 'Title 7' },
    '8': { title: 'Title 8' },
  };
}
