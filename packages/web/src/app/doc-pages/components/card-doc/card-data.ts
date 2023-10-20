import changelogJson from '@elvia/elvis-card/CHANGELOG.json';
import ComponentData from '../component-data.interface';
import { BaseCardProps } from '@elvia/elvis-card/react';

const cardData: ComponentData<BaseCardProps> = {
  changelog: changelogJson.content,
  name: 'Card',
  attributes: {
    icon: {
      type: 'string | HTMLElement | JSX.Element',
      description: 'Text or icon (use slot in webcomponent if not just text).',
    },
    type: {
      type: '"simple" | "detail"',
      description: 'The type of the card. The types are described in more detail in the "types" section.',
      default: '"simple"',
    },
    heading: {
      type: 'string',
      description: 'Card heading.',
    },
    headingLevel: {
      type: '"h1" | "h2" | "h3" | "h4" | "h5" | "h6"',
      default: '"h3"',
      description: 'Defines the HTML heading used on the card heading.',
    },
    description: {
      type: 'string',
      description: 'Description text, keep it short if not detail card.',
    },
    borderColor: {
      type: '"green" | "blue-berry" | "red" | "orange"',
      description: 'Color on top of the card. Only applies to simple card. ',
    },
    width: {
      type: 'string',
      default: '100%',
      description:
        'Override the width of the card. Any CSS length value is accepted. Width cannot be less than 112px (or 250px for detail type card). ',
      example: /* ts */ `width = "100%"; width = "20vw"; width = "75%"; width = "150px";`,
    },
    height: {
      type: 'string',
      description: 'Override the height the of card. Any CSS length value is accepted.',
      example: /* ts */ `height = "100%"; height = "20vw"; height = "75%"; height = "150px";`,
    },
    minWidth: {
      type: 'number',
      default: '112 | 250',
      description:
        'The minimum width of the card in px, cannot be less than 112px (or 250px for detail type card).',
    },
    maxWidth: {
      type: 'number',
      default: '250 | 600',
      description:
        'The maximum width of the card in px, cannot be more than 250 (or 600 for detail type card).',
    },
    maxDescriptionLines: {
      type: 'number',
      default: '3',
      description:
        'The maximum number of text lines in the description. Overflow is clamped with an ellipsis. NB: This prop is only used for detail cards.',
    },
    maxHeadingLines: {
      type: 'number',
      default: '1 | 2',
      description:
        'The maximum number of text lines in heading. Overflow is clamped with an ellipsis. Default 1 (2 for detail type card).',
    },
    tag: {
      type: 'string',
      description: 'The content for a tag on bottom of the card, only available on detail card.',
    },
    iconHover: {
      type: 'string | HTMLElement | JSX.Element',
      description: 'Text or icon to swap icon for on hover (use slot in webcomponent if not just text).',
    },
    cornerIcon: {
      type: 'string | HTMLElement | JSX.Element',
      description: 'Icon on upper right corner of card (use slot in webcomponent).',
    },
  },
};

export { cardData };
