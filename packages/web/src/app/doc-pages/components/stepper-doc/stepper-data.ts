import changelogJson from '@elvia/elvis-stepper/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const stepperData: ComponentData = {
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
    },
    isForced: {
      type: 'boolean',
      description:
        'A forced stepper requires the user to complete each step before continuing to the next one. They can always go back to an earlier step. If a step is incomplete and the user tries to go forward an error message should appear.',
      default: 'false',
    },
    typography: {
      type: 'string',
      description:
        'The stepper uses custom typography for the titles of each step. If you want to use any of the design system typographies, pass the name of the typography here. Example: "text-md"',
    },
    content: {
      isRequired: true,
      type: 'HTMLElement | JSX.Element',
      description: 'Text, images, tables or any other content (slot in webcomponent).',
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
