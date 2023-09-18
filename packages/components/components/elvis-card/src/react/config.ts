import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Card',
  attributes: [
    { name: 'icon', type: 'string' },
    { name: 'iconHover', type: 'string' },
    { name: 'heading', type: 'string' },
    { name: 'headingLevel', type: 'string' },
    { name: 'description', type: 'string' },
    { name: 'borderColor', type: 'string' },
    { name: 'type', type: 'string' },
    { name: 'height', type: 'string' },
    { name: 'width', type: 'string' },
    { name: 'minWidth', type: 'number' },
    { name: 'maxWidth', type: 'number' },
    { name: 'maxDescriptionLines', type: 'number' },
    { name: 'maxHeadingLines', type: 'number' },
    { name: 'tag', type: 'string' },
    { name: 'cornerIcon', type: 'string' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
  ],
};
