import { ComponentConfig } from '@elvia/elvis-toolbox';

const config: ComponentConfig = {
  componentName: 'Modal',
  deprecatedProps: {
    onHide: {
      version: '2.0.0',
      explanation: 'Instead use onOpen and onClose.',
      isCallbackFunction: true,
    },
  },
};

export default config;
