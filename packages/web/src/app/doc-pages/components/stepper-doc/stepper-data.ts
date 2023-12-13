import changelogJson from '@elvia/elvis-stepper/CHANGELOG.json';
import ComponentData, { NestedProp } from '../component-data.interface';
import { BaseStepperProps, StepState } from '@elvia/elvis-stepper/react';

type ContentMock = {
  content: string;
};

export const stepperData: ComponentData<BaseStepperProps & ContentMock> = {
  changelog: changelogJson.content,
  name: 'Stepper',
  attributes: {
    type: {
      type: '"horizontal" | "vertical"',
      description: 'Which type of stepper should be displayed.',
      default: '"horizontal"',
    },
    steps: {
      type: '{[stepIndex: number]: StepItem}',
      description:
        'An object to define the heading, next- and previous-button text and/or the state of the step.',
      example: `const steps = { 1: { heading: 'Title 1', isCompleted: true }, 2: { heading: 'Title 2', isCompleted: true }, 3: { heading: 'Title 3' }, 4: { heading: 'Title 4', nextButtonText: 'Lagre' }}`,
      children: {
        heading: {
          type: 'string',
          description: 'The heading for the step',
        },
        isCompleted: {
          type: 'boolean',
          description: 'Whether the step is completed or not.',
        },
        isError: {
          type: 'boolean',
          description: 'Whether the step has an error.',
        },
        nextButtonText: {
          type: 'string',
          description: 'The text that should be visible in the next-step button.',
          default: 'Neste',
        },
        previousButtonText: {
          type: 'string',
          description: 'The text that should be visible in the previous-step button.',
          default: 'Tilbake',
        },
      },
    } as NestedProp<StepState>,
    isForced: {
      type: 'boolean',
      description:
        'A forced stepper requires the user to complete each step before continuing to the next one. They can always go back to an earlier step. If a step is incomplete and the user tries to go forward an error message should appear.',
      default: 'false',
    },
    typography: {
      type: 'string',
      description:
        'The stepper uses custom typography for the titles of each step. If you want to use any of the design system typographies, pass the name of the typography here.',
      example: /* ts */ `typography = "text-md"`,
    },
    content: {
      isRequired: true,
      type: 'HTMLElement | JSX.Element[]',
      description:
        'Text, images, tables or any other content. For React, an array of elements. For web component, a slot with element children.',
    },
    value: {
      type: 'number',
      description: 'The index of the current step',
    },
    valueOnChange: {
      isEvent: true,
      type: '(stepIndex: number) => void',
      description: 'Emits when the step index changes.',
    },
  },

  does: [
    'Use a stepper in a process that’s split up in clear steps, where the user could benefit from a overview and/or navigation between the steps',
  ],
  donts: [
    'If the process consists of less than three steps',
    'If the process consists of more than ten steps (in this case, consider the possibility of using less steps by changing the flow)',
    'If it is not a step-by-step process, for example a list',
  ],
};
