import changelogJson from 'src/assets/changelogs/elvis-carousel/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const carouselData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Carousel',
  attributes: {
    items: {
      isRequired: true,
      type: 'CarouselItem[] | number | slot',
      description:
        'A collection of related items that should be displayed in a carousel. If not React, send the items in by slots. Name the slots "item-1", "heading-1", "item-2", "heading-2" and so on.',
      cegDisplayName: 'No content',
    },
    type: {
      isRequired: false,
      type: "'loop' | 'linear'",
      description:
        'The "loop" type allows the user to cycle through the carousel items endlessly, while the "linear" type allows the user to navigate the carousel items in a linear way, both forward and backwards.',
      default: 'loop',
    },
    hasConfirmationCheckmark: {
      isRequired: false,
      type: 'boolean',
      description:
        'Whether a checkmark button should be used for the last carousel-item. This requires the type to be "linear". This could be used in an onboarding situation.',
      default: 'false',
    },
    onFinish: {
      isRequired: false,
      type: '() => void',
      description:
        'Callback function for when the checkmark button is clicked. This requires the type to be "linear" and hasConfirmationButton to be true.',
      default: 'false',
    },
    value: {
      isRequired: false,
      type: 'number',
      description: 'Index of selected carousel index.',
      default: '0',
    },
    valueOnChange: {
      isRequired: false,
      type: '(value: number) => CustomEvent',
      description: 'Gets called every time the value is changed.',
    },
    hasAnimation: {
      isRequired: false,
      type: 'boolean',
      description: 'Can be used to turn off the animation when moving between items in the carousel.',
      default: 'true',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom CSS classes that can be added to the carousel.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the carousel. Example: {marginTop: '8px', width: '100%'}",
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
