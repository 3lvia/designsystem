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
    { name: 'width', type: 'string' },
    { name: 'minWidth', type: 'number' },
    { name: 'maxWidth', type: 'number' },
    { name: 'maxDescriptionLines', type: 'number' },
    { name: 'maxHeadingLines', type: 'number' },
    { name: 'tag', type: 'string' },
    { name: 'cornerIcon', type: 'string' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
    // Deprecated attributes
    {
      name: 'hasBorder',
      type: 'boolean',
      deprecatedDetails: {
        version: '3.2.0',
        explanation: 'Card now has the same border on all backgrounds. No replacement needed.',
      },
    },
    {
      name: 'header',
      type: 'string',
      deprecatedDetails: { version: '2.0.0', newProp: 'heading', isDirectReplacement: true },
    },
    {
      name: 'shape',
      type: 'string',
      deprecatedDetails: {
        version: '2.0.0',
        isDirectReplacement: false,
        explanation: 'The shape property has been removed as circle card is no longer supported.',
      },
    },
    {
      name: 'label',
      type: 'string',
      deprecatedDetails: { version: '2.0.0', newProp: 'tag', isDirectReplacement: true },
    },
  ],
};
