import { ComponentConfig } from '@elvia/elvis-toolbox';

const config: ComponentConfig = {
  componentName: 'Chip',
  deprecatedProps: {
    // Rule 1.3: Better naming for booleans
    disabled: {
      version: '', // TODO: Update
      newProp: 'isDisabled',
      isDirectReplacement: true,
    },
  },
};

export default config;
