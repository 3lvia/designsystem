import { ComponentConfig } from '@elvia/elvis-toolbox';

const config: ComponentConfig = {
  componentName: 'Chip',
  deprecatedProps: {
    // Rule 1.3: Better naming for booleans
    disabled: {
      version: '1.4.0',
      newProp: 'isDisabled',
      isDirectReplacement: true,
    },
  },
};

export default config;
