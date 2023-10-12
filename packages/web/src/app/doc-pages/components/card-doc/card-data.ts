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
        'Override width of card. Any css length value is accepted (e.g. 150px, 20vw, 75%). Width cannot be less than 112px (or 250px for detail type card). ',
    },
    height: {
      type: 'string',
      description: 'Override height of card. Any css length value is accepted (e.g. 150px, 20vw, 75%).',
    },
    minWidth: {
      type: 'number',
      default: '112 | 250',
      description: 'Minimum width of card in px, cannot be less than 112px (or 250px for detail type card).',
    },
    maxWidth: {
      type: 'number',
      default: '250 | 600',
      description: 'Maximum width of card in px, cannot be more than 250 (or 600 for detail type card).',
    },
    maxDescriptionLines: {
      type: 'number',
      default: '3',
      description:
        'Max number of text lines in description. Overflow is clamped with an ellipsis. NB: This prop is only used for detail cards.',
    },
    maxHeadingLines: {
      type: 'number',
      default: '1 | 2',
      description:
        'Max number of text lines in heading. Overflow is clamped with an ellipsis. Default 1 (2 for detail type card).',
    },
    tag: {
      type: 'string',
      description: 'Tag on bottom of card, only available on detail card.',
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
