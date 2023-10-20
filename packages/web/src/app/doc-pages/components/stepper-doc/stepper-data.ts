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
      type: 'object',
      description:
        'An object to define the heading, next- and previous-button text and/or the state of the step.',
      example: `const steps = { 1: { heading: 'Title 1', isCompleted: true }, 2: { heading: 'Title 2', isCompleted: true }, 3: { heading: 'Title 3' }, 4: { heading: 'Title 4', nextButtonText: 'Lagre' }}`,
      children: {
        1: {
          type: 'object',
          description: 'Number of step. Create a new object on this level for each step.',
          children: {
            heading: {
              type: 'string',
              description: 'The heading of the step.',
            },
            nextButtonText: {
              type: 'string',
              description: 'The text of the next button.',
            },
            previousButtonText: {
              type: 'string',
              description: 'The text of the previous button.',
            },
            isCompleted: {
              type: 'boolean',
              description: 'If the step is completed.',
            },
            isError: {
              type: 'boolean',
              description: 'If the step has an error.',
            },
          },
        },
      },
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
        'The stepper uses custom typography for the titles of each step. If you want to use any of the design system typographies, pass the name of the typography here.',
      example: /* ts */ `typography = "text-md"`,
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
