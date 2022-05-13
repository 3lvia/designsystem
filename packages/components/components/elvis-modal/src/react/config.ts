import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  componentName: 'Modal',
  deprecatedProps: {
    // Rule 1.8: Reserved words
    title: {
      version: '2.0.0',
      newProp: 'heading',
      isDirectReplacement: true,
    },
    // Rule 1.4: Event names
    onHide: {
      version: '2.0.0',
      newProp: 'onClose',
      isCallbackFunction: true,
    },
    // Rule 1.2: Complete words
    hasCloseBtn: {
      version: '2.0.0',
      newProp: 'hasCloseBtn',
      isDirectReplacement: true,
    },
  },
};
