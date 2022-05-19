import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  componentName: 'Dropdown',
  deprecatedProps: {
    // Rule 1.13: Selected value
    defaultValue: {
      version: '3.0.0',
      newProp: 'value',
      isDirectReplacement: true,
    },
    // Rule 1.12: List of elements
    options: {
      version: '3.0.0',
      newProp: 'items',
      isDirectReplacement: true,
    },
  },
};
