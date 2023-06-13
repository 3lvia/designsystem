import changelogJson from 'src/assets/changelogs/elvis-stepper/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const stepperData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Stepper',
  attributes: {
    type: {
      isRequired: false,
      type: '"horizontal" | "vertical"',
      description: 'Which type of stepper should be displayed.',
      default: '"horizontal"',
    },
    steps: {
      isRequired: false,
      type: '{[stepIndex: number]: StepItem}',
      description: 'An object to define the title and/or the state of the step.',
    },
    isForced: {
      isRequired: false,
      type: 'boolean',
      description:
        'In a forced stepper the user has to complete a step before continuing to the next one. They can always step backwards to an earlier step. If a field is not filled and the user tries to go forward an error message should appear.',
      default: 'false',
    },
    completeButtonText: {
      isRequired: false,
      type: 'string',
      description: 'Text to display in the last next-button.',
    },
    typography: {
      isRequired: false,
      type: 'string',
      description:
        'The stepper uses custom typography for the titles of each step. If you want to use any of the design system typographies, pass the name of the typography here. Example: "text-md"',
    },
    content: {
      isRequired: true,
      type: 'HTMLElement | JSX.Element',
      description: 'Text, images, tables or any other content (slot in webcomponent).',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom CSS classes that can be added to the stepper.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the stepper. Example: {marginTop: '8px', width: '100%'}",
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
