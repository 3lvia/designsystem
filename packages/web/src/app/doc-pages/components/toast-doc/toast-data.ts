import changelogJson from '@elvia/elvis-toast/CHANGELOG.json';
import { ToastProps } from '@elvia/elvis-toast/react';

import ComponentData from '../component-data.interface';

export const toastData: ComponentData<ToastProps> = {
  changelog: changelogJson.content,
  name: 'Toast',
  attributes: {
    openElviaToast: {
      isRequired: false,
      type: '(params: ToastConfigType) => void',
      specialType: 'function',
      children: {
        title: {
          isRequired: false,
          type: 'string',
          description: 'The title showed in the toast.',
          specialType: 'function',
        },
        body: {
          isRequired: false,
          type: 'string',
          description: 'The body showed in the toast.',
          specialType: 'function',
        },
        duration: {
          isRequired: false,
          type: 'number',
          default: 7000,
          description: 'How long the toast is visible, in milliseconds.',
          specialType: 'function',
        },
        closable: {
          isRequired: false,
          type: 'boolean',
          default: false,
          description: 'Whether the toast has a close button.',
          specialType: 'function',
        },
        status: {
          isRequired: false,
          type: '"positive" | "informative" | "negative"',
          default: '"positive"',
          description: 'The toast status, which changes its appearance.',
          specialType: 'function',
        },
        customIcon: {
          isRequired: false,
          type: 'string',
          description: 'Allows for writing inner HTML to replace the default icon.',
          example: /* ts */ `customIcon = '<i class="e-icon e-icon--crane"></i>'`,
          specialType: 'function',
        },
      },
    },
  },
};
