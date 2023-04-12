import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Carousel',
  attributes: [
    { name: 'items', type: 'string' },
    { name: 'loop', type: 'boolean' },
    { name: 'type', type: 'string' },
    { name: 'hasConfirmationCheckmark', type: 'boolean' },
    { name: 'hasAnimation', type: 'boolean' },
    { name: 'value', type: 'number' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
    // Deprecated attributes
    {
      name: 'elements',
      type: 'string',
      deprecatedDetails: {
        version: '2.0.0',
        newProp: 'items',
        isDirectReplacement: false,
        explanation:
          "'elements' have been replaced by 'items'. The child-type CarouselElement has been renamed to CarouselItem.",
      },
    },
    {
      name: 'loop',
      type: 'string',
      deprecatedDetails: {
        version: '3.0.0',
        newProp: 'type',
        isDirectReplacement: false,
        explanation: "'loop' has been replaced by 'type'.",
      },
    },
    {
      name: 'useOnboardingCheckmark',
      type: 'boolean',
      deprecatedDetails: { version: '2.0.0', newProp: 'hasConfirmationCheckmark', isDirectReplacement: true },
    },
    {
      name: 'hideArrows',
      type: 'boolean',
      deprecatedDetails: {
        version: '2.0.0',
        newProp: 'loop',
        isDirectReplacement: false,
        explanation:
          'Changed hideArrows to loop to better describe use-case. Remember to invert the boolean if hideArrows is being used.',
      },
    },
    {
      name: 'onHide',
      type: 'event',
      deprecatedDetails: { version: '2.0.0', newProp: 'onFinish', isDirectReplacement: true },
    },
  ],
};
