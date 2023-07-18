import changelogJson from '@elvia/elvis-stepper/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const configurationProps: ComponentData = {
  changelog: changelogJson.content,
  name: 'Stepper',
  attributes: {
    heading: {
      isRequired: false,
      type: 'string',
      description: 'The heading showed in the step.',
    },
    isError: {
      isRequired: false,
      type: 'boolean',
      description: 'State if there is an error in the step.',
    },
    isCompleted: {
      isRequired: false,
      type: 'boolean',
      description: 'State if the step is complete.',
    },
    previousButtonText: {
      isRequired: false,
      type: 'string',
      description: 'Text to display in the previous-button.',
      default: '"Forrige"',
    },
    nextButtonText: {
      isRequired: false,
      type: 'string',
      description: 'Text to display in the next-button.',
      default: '"Neste"',
    },
  },
};
