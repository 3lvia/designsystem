import { ComponentConfig } from '@elvia/elvis-toolbox';

const config: ComponentConfig = {
  componentName: 'Chip',
  deprecatedProps: {
    // Rule 1.3: Better naming for booleans
    disabled: {
      version: '2.0.0',
      newProp: 'isDisabled',
      isDirectReplacement: true,
    },
    // Rule 1.3: Better naming for booleans
    selected: {
      version: '2.0.0',
      newProp: 'isSelected',
      isDirectReplacement: true,
    },
    valueOnChange: {
      version: '2.0.0',
      newProp: 'isSelectedOnChange',
      isCallbackFunction: true,
    },
  },
};

export default config;
