import ComponentData from '../component-data.interface';

export const configurationProps: ComponentData = {
  name: 'Toast',
  attributes: {
    title: {
      isRequired: false,
      type: 'string',
      description: 'The title showed in the toast.',
    },
    body: {
      isRequired: false,
      type: 'string',
      description: 'The body showed in the toast.',
    },
    duration: {
      isRequired: false,
      type: 'number',
      default: 7000,
      description: 'How long the toast is visible, in milliseconds.',
    },
    closable: {
      isRequired: false,
      type: 'boolean',
      default: false,
      description: 'Whether the toast has a close button.',
    },
    status: {
      isRequired: false,
      type: '"positive" | "informative"',
      default: '"positive"',
      description: 'The toast status, which changes its appearance',
    },
    customIcon: {
      isRequired: false,
      type: 'string',
      description:
        'Allows for writing inner HTML to replace the default icon. Example: <i class="e-icon e-icon--crane"></i>',
    },
  },
};
