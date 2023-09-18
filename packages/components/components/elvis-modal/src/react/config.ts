import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Modal',
  attributes: [
    { name: 'isShowing', type: 'boolean' },
    { name: 'heading', type: 'string' },
    { name: 'content', type: 'string' },
    { name: 'illustration', type: 'string' },
    { name: 'primaryButton', type: 'string' },
    { name: 'secondaryButton', type: 'string' },
    { name: 'hasCloseButton', type: 'boolean' },
    { name: 'hasLockBodyScroll', type: 'boolean' },
    { name: 'hasPadding', type: 'boolean' },
    { name: 'disableClose', type: 'boolean' },
    { name: 'disableBackdrop', type: 'boolean' },
    { name: 'maxWidth', type: 'string' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
  ],
};
