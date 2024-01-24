import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'ContextMenu',
  attributes: [
    { name: 'content', type: 'string' },
    { name: 'disableAutoClose', type: 'boolean' },
    { name: 'hasDivider', type: 'boolean' },
    { name: 'horizontalPosition', type: 'string' },
    { name: 'verticalPosition', type: 'string' },
    { name: 'isSelectable', type: 'boolean' },
    { name: 'isShowing', type: 'boolean' },
    { name: 'trigger', type: 'boolean' },
    { name: 'display', type: 'string' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
  ],
};
