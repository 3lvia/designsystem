import changelogJson from '@elvia/elvis-toast/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const toastData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Toast',
  attributes: {
    title: {
      description: 'The title showed in the toast.',
      isArgument: true,
      isRequired: false,
      type: 'string',
    },
    body: {
      description: 'The body showed in the toast.',
      isArgument: true,
      isRequired: false,
      type: 'string',
    },
    duration: {
      default: 7000,
      description: 'How long the toast is visible, in milliseconds.',
      isArgument: true,
      isRequired: false,
      type: 'number',
    },
    closable: {
      default: false,
      description: 'Whether the toast has a close button.',
      isArgument: true,
      isRequired: false,
      type: 'boolean',
    },
    status: {
      default: '"positive"',
      description: 'The toast status, which changes its appearance',
      isArgument: true,
      isRequired: false,
      type: '"positive" | "informative"',
    },
    customIcon: {
      description: 'Allows for writing inner HTML to replace the default icon.',
      example: /* ts */ `customIcon = '<i class="e-icon e-icon--crane"></i>'`,
      isArgument: true,
      isRequired: false,
      type: 'string',
    },
  },
};
