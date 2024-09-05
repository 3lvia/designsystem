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
          description: 'The title is shown in the toast.',
        },
        body: {
          isRequired: false,
          type: 'string',
          description: 'The body is shown in the toast.',
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
          type: '"positive" | "informative" | "negative"',
          default: '"positive"',
          description: 'The toast status, which changes its appearance.',
        },
        customIcon: {
          isRequired: false,
          type: 'string',
          description: 'Allows for writing inner HTML to replace the default icon.',
          example: /* ts */ `customIcon = '<e-icon name="crane"></e-icon>'`,
        },
      },
    },
  },
};
