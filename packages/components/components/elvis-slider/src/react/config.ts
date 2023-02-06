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
    { name: 'hasTooltip', type: 'boolean' },
    { name: 'heading', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
    { name: 'isCompact', type: 'boolean' },
    { name: 'isDisabled', type: 'boolean' },
    { name: 'label', type: 'string' },
    { name: 'max', type: 'number' },
    { name: 'min', type: 'number' },
    { name: 'type', type: 'string' },
    { name: 'unit', type: 'string' },
    { name: 'value', type: 'number' },
  ],
};
