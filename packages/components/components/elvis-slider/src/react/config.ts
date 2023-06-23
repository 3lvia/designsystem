import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Slider',
  attributes: [
    { name: 'ariaLabel', type: 'object' },
    { name: 'className', type: 'string' },
    { name: 'errorOptions', type: 'object' },
    {
      name: 'hasHintValues',
      type: 'boolean',
      deprecatedDetails: {
        version: '3.0.0',
        explanation: "'hasHintValues' has been removed. Use 'hasHints' instead.",
        isDirectReplacement: true,
      },
    },
    {
      name: 'hasHints',
      type: 'boolean',
    },
    { name: 'hasInputField', type: 'boolean' },
    {
      name: 'hasPercent',
      type: 'boolean',
      deprecatedDetails: {
        version: '3.0.0',
        explanation: "'hasPercent' has been removed. No replacement needed.",
      },
    },
    {
      name: 'hasTooltip',
      type: 'boolean',
      deprecatedDetails: {
        version: '3.0.0',
        explanation: "'hasTooltip' has been removed. No replacement needed.",
      },
    },
    { name: 'inlineStyle', type: 'object' },
    { name: 'isDisabled', type: 'boolean' },
    { name: 'label', type: 'string' },
    { name: 'max', type: 'number' },
    { name: 'min', type: 'number' },
    { name: 'size', type: 'string' },
    { name: 'unit', type: 'string' },
    { name: 'type', type: 'string' },
    { name: 'value', type: 'number' },
  ],
};
