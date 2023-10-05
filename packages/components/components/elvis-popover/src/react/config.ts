import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Popover',
  attributes: [
    { name: 'heading', type: 'string' },
    { name: 'content', type: 'string' },
    { name: 'horizontalPosition', type: 'string' },
    { name: 'verticalPosition', type: 'string' },
    { name: 'trigger', type: 'string' },
    { name: 'hasCloseButton', type: 'boolean' },
    { name: 'noPadding', type: 'boolean' },
    { name: 'isShowing', type: 'boolean' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
  ],
};
