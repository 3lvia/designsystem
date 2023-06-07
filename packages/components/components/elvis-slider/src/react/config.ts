import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Slider',
  attributes: [
    { name: 'ariaLabel', type: 'string' },
    { name: 'className', type: 'string' },
    { name: 'errorOptions', type: 'object' },
    { name: 'hasHintValues', type: 'boolean' },
    { name: 'hasInputField', type: 'boolean' },
    { name: 'hasPercent', type: 'boolean' },
    {
      name: 'hasTooltip',
      type: 'boolean',
      deprecatedDetails: {
        version: '3.0.0',
        explanation: "'hasTooltip' has been removed. No replacement needed.",
      },
    },
    { name: 'heading', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
    { name: 'isDisabled', type: 'boolean' },
    { name: 'label', type: 'string' },
    { name: 'max', type: 'number' },
    { name: 'min', type: 'number' },
    { name: 'size', type: 'string' },
    { name: 'type', type: 'string' },
    { name: 'unit', type: 'string' },
    { name: 'value', type: 'number' },
  ],
};
