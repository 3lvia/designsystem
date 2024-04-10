import changelogJson from '@elvia/elvis-carousel/CHANGELOG.json';
import { BaseCarouselProps, CarouselItem } from '@elvia/elvis-carousel/react';

import ComponentData, { NestedProp } from '../component-data.interface';

// We force items to be CarouselItem, since it actually is a union of number and CarouselItem[], which is hard to type correctly.
export const carouselData: ComponentData<BaseCarouselProps & { items: CarouselItem[] }> = {
  changelog: changelogJson.content,
  name: 'Carousel',
  attributes: {
    items: {
      isRequired: true,
      type: 'object[] | number',
      description:
        'A collection of related items that should be displayed in a carousel. If not React, send the items in by slots. Name the slots "item-1", "heading-1", "item-2", "heading-2" and so on.',
      children: {
        heading: {
          type: 'JSX.Element | string',
          description: 'The title of the item.',
        },
        item: {
          type: 'JSX.Element | string',
          description: 'The content of the item.',
        },
      },
    },
    type: {
      type: '"loop" | "linear"',
      description:
        'The "loop" type allows the user to cycle through the carousel items endlessly, while the "linear" type allows the user to navigate the carousel items in a linear way, both forward and backwards.',
      default: '"loop"',
    },
    hasConfirmationCheckmark: {
      type: 'boolean',
      description:
        'Whether a checkmark button should be used for the last carousel-item. This requires the type to be "linear". This could be used in an onboarding situation.',
      default: 'false',
    },
    onFinish: {
      specialType: 'event',
      type: '() => void',
      description:
        'Callback function for when the checkmark button is clicked. This requires the type to be "linear" and hasConfirmationCheckmark to be true.',
      default: 'false',
    },
    value: {
      type: 'number',
      description: 'Index of selected carousel index.',
      default: '0',
    },
    valueOnChange: {
      specialType: 'event',
      type: '(value: number) => void',
      description: 'Gets called every time the value is changed.',
    },
    hasAnimation: {
      type: 'boolean',
      description: 'Can be used to turn off the animation when moving between items in the carousel.',
      default: 'true',
    },
  },

  does: [
    'Many items to display and the user only needs to focus on a few at once',
    'Collection of related items',
  ],
  donts: [
    'Should not be use on non-visual items such as links or paragraphs',
    'More than five frames - It’s unlikely users will engage with more than that (Use a list instead)',
  ],
};

const f = {
  isRequired: true,
  type: 'object[]',
  description:
    'A collection of related items that should be displayed in a carousel. If not React, send the items in by slots. Name the slots "item-1", "heading-1", "item-2", "heading-2" and so on.',
  children: {
    heading: {
      type: 'JSX.Element | string',
      description: 'The title of the item.',
    },
    item: {
      type: 'JSX.Element | string',
      description: 'The content of the item.',
    },
  },
} as NestedProp<CarouselItem>;
