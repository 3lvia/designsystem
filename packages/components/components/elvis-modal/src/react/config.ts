import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  componentName: 'Modal',
  deprecatedProps: {
    title: {
      version: '2.0.0',
      newProp: 'heading',
      isDirectReplacement: true,
    },
    onHide: {
      version: '2.0.0',
      newProp: 'onClose',
      isCallbackFunction: true,
    },
    hasCloseBtn: {
      version: '2.0.0',
      newProp: 'hasCloseBtn',
      isDirectReplacement: true,
    },
  },
};
