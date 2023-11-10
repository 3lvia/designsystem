import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Accordion',
  attributes: [
    { name: 'content', type: 'string' },
    { name: 'isOpen', type: 'boolean' },
    { name: 'isHovering', type: 'boolean' },
    { name: 'isFullWidth', type: 'boolean' },
    { name: 'openLabel', type: 'string' },
    { name: 'closeLabel', type: 'string' },
    { name: 'openDetailText', type: 'string' },
    { name: 'closeDetailText', type: 'string' },
    { name: 'openAriaLabel', type: 'string' },
    { name: 'closeAriaLabel', type: 'string' },
    { name: 'isStartAligned', type: 'boolean' },
    { name: 'labelPosition', type: 'string' },
    { name: 'size', type: 'string' },
    { name: 'type', type: 'string' },
    { name: 'spacingAboveContent', type: 'string' },
    { name: 'spacingBelowContent', type: 'string' },
    { name: 'typography', type: 'string' },
    { name: 'overflowHeight', type: 'number' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
  ],
};
