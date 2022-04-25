import { ComponentConfig } from '@elvia/elvis-toolbox';

const config: ComponentConfig = {
  componentName: 'Card',
  deprecatedProps: {
    hasBorder: {
      version: '2.0.0',
      newProp: 'theme',
      explanation: 'This prop has been replaced by the new theme functionality.',
    },
    header: {
      version: '2.0.0',
      newProp: 'heading',
      isDirectReplacement: true,
    },
  },
};

export default config;
