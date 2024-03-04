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
      isFunction: true,
      children: {
        title: {
          isRequired: false,
          type: 'string',
          description: 'The title showed in the toast.',
          isFunction: true,
        },
        body: {
          isRequired: false,
          type: 'string',
          description: 'The body showed in the toast.',
          isFunction: true,
        },
        duration: {
          isRequired: false,
          type: 'number',
          default: 7000,
          description: 'How long the toast is visible, in milliseconds.',
          isFunction: true,
        },
        closable: {
          isRequired: false,
          type: 'boolean',
          default: false,
          description: 'Whether the toast has a close button.',
          isFunction: true,
        },
        status: {
          isRequired: false,
          type: '"positive" | "informative" | "negative"',
          default: '"positive"',
          description: 'The toast status, which changes its appearance.',
          isFunction: true,
        },
        customIcon: {
          isRequired: false,
          type: 'string',
          description: 'Allows for writing inner HTML to replace the default icon.',
          example: /* ts */ `customIcon = '<i class="e-icon e-icon--crane"></i>'`,
          isFunction: true,
        },
      },
    },
  },
};
