import { ComponentConfig } from '@elvia/elvis-toolbox';

export const carouselConfig: ComponentConfig = {
  componentName: 'Carousel',
  deprecatedProps: {
    // Rule 1.12: list of items
    elements: {
      version: '2.0.0',
      newProp: 'items',
      isDirectReplacement: false,
      explanation:
        "'elements' have been replaced by 'items'. The child-type CarouselElement has been renamed to CarouselItem.",
    },
    // Rule 1.3: Booleans
    hideArrows: {
      version: '2.0.0',
      newProp: 'loop',
      isDirectReplacement: false,
      explanation:
        'Changed hideArrows to loop to better describe use-case. Remeber to invert the boolean if hideArrows is being used.',
    },
    // Rule 1.3: Booleans
    useOnboardingCheckmark: {
      version: '2.0.0',
      newProp: 'hasConfirmationCheckmark',
      isDirectReplacement: true,
    },
    // Rule 1.4: Event handler.
    onHide: {
      version: '2.0.0',
      newProp: 'onFinish',
      isDirectReplacement: true,
      explanation: 'More self-explaining name.',
    },
  },
};

export const carouselItemConfig: ComponentConfig = {
  componentName: 'CarouselItem',
  deprecatedProps: {
    // Rule 1.12: items, not elements
    element: {
      version: '2.0.0',
      newProp: 'item',
      isDirectReplacement: true,
    },
    // Rule 1.8: do not use title
    title: {
      version: '2.0.0',
      newProp: 'heading',
      isDirectReplacement: true,
    },
  },
};
