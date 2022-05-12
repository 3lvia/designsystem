import { ComponentConfig } from '@elvia/elvis-toolbox';

export const CarouselConfig: ComponentConfig = {
  componentName: 'Carousel',
  deprecatedProps: {
    // Rule 1.12, list of items
    elements: {
      version: '2.0.0', // TODO: check this
      newProp: 'items',
      isDirectReplacement: false,
      explanation:
        "'elements' have been replaced by 'items'. The child-type CarouselElement has been renamed to CarouselItem.",
    },
  },
};

export const CarouselItemConfig: ComponentConfig = {
  componentName: 'CarouselItem',
  deprecatedProps: {
    // Rule ????
    element: {
      version: '2.0.0', // TODO: check this
      newProp: 'item',
      isDirectReplacement: true,
    },
  },
};
