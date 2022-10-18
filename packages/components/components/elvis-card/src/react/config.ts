import { ComponentConfig } from '@elvia/elvis-toolbox';

export const cardConfig: ComponentConfig = {
  componentName: 'Card',
  deprecatedProps: {
    shape: {
      version: '2.0.0',
      isDirectReplacement: false,
      explanation: 'The shape property has been removed as circle card is no longer supported.',
    },
    header: {
      version: '2.0.0',
      newProp: 'heading',
      isDirectReplacement: true,
    },
    label: {
      version: '2.0.0',
      newProp: 'tag',
      isDirectReplacement: true,
    },
  },
};
