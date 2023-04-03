import changelogJson from 'src/assets/changelogs/elvis-card/CHANGELOG.json';
import ComponentData from '../component-data.interface';

const cardData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Card',
  attributes: {
    icon: {
      isRequired: false,
      type: 'string | HTMLElement | JSX.Element',
      description: 'Text or icon (use slot in webcomponent if not just text).',
    },
    type: {
      isRequired: false,
      type: '"simple" | "detail"',
      description: 'The type of the card. The types are described in more detail in the "types" section.',
      default: '"simple"',
    },
    heading: {
      isRequired: false,
      type: 'string',
      description: 'Card heading.',
    },
    headingLevel: {
      isRequired: false,
      type: 'h1 | h2 | h3 | h4 | h5 | h6',
      default: 'h3',
      description: 'Defines the HTML heading used on the card heading.',
    },
    description: {
      isRequired: false,
      type: 'string',
      description: 'Description text, keep it short if not detail card.',
      cegDisplayName: 'Description',
      cegType: 'string',
      cegFormType: 'toggle',
      cegDefault: true,
      cegOption: 'Description',
      cegDependency: [{ name: 'type', value: 'simple' }],
    },
    borderColor: {
      isRequired: false,
      type: 'green | blue-berry | red | orange',
      description: 'Color on top of the card. Only applies to simple card. ',
      cegDisplayName: 'Border color',
      cegDefault: 'none',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['none', 'green', 'blue-berry', 'red', 'orange'],
      cegDependency: [{ name: 'type', value: 'simple' }],
    },
    hasBorder: {
      isRequired: false,
      type: 'boolean',
      description: 'If the card is on a light grey background this prop should be set to false.',
      default: 'true',
      cegDefault: 0,
      cegType: 'boolean',
      cegFormType: 'background',
      cegOptions: ['White', 'Light grey'],
    },
    width: {
      isRequired: false,
      type: 'string',
      default: '100%',
      description: 'Override width of card. Any css length value is accepted (e.g. 150px, 20vw, 75%).',
    },
    height: {
      isRequired: false,
      type: 'string',
      description: 'Override height of card. Any css length value is accepted (e.g. 150px, 20vw, 75%).',
    },
    minWidth: {
      isRequired: false,
      type: 'number',
      default: '112 | 250',
      description: 'Minimum width of card in px, cannot be less than 112 (or 250 for detail type card).',
    },
    maxWidth: {
      isRequired: false,
      type: 'number',
      default: '250 | 400',
      description: 'Maximum width of card in px, cannot be more than 250 (or 400 for detail type card).',
    },
    maxDescriptionLines: {
      isRequired: false,
      type: 'number',
      default: '3',
      description:
        'Max number of text lines in description. Overflow is clamped with an ellipsis. NB: This prop is only used for detail cards.',
    },
    maxHeadingLines: {
      isRequired: false,
      type: 'number',
      default: '1 | 2',
      description:
        'Max number of text lines in heading. Overflow is clamped with an ellipsis. Default 1 (2 for detail type card).',
    },
    tag: {
      isRequired: false,
      type: 'string',
      description: 'Tag on bottom of card, only available on detail card.',
      cegDisplayName: 'Tag',
      cegType: 'string',
      cegFormType: 'toggle',
      cegDefault: true,
      cegOption: 'Tag',
      cegDependency: [{ name: 'type', value: 'detail' }],
    },
    iconHover: {
      isRequired: false,
      type: 'string | HTMLElement | JSX.Element',
      description: 'Text or icon to swap icon for on hover (use slot in webcomponent if not just text).',
      cegDisplayName: 'Two-colored icon on hover',
      cegType: 'boolean',
      cegFormType: 'toggle',
      cegDefault: false,
      cegSlot: '<i class="e-icon e-icon--electricity_safety-color e-icon--md" aria-hidden="true"></i>',
      cegDependency: [{ name: 'type', value: 'simple' }],
    },
    cornerIcon: {
      isRequired: false,
      type: 'string | HTMLElement | JSX.Element',
      description: 'Icon on upper right corner of card (use slot in webcomponent).',
      cegDisplayName: 'Corner Icon',
      cegType: 'boolean',
      cegFormType: 'toggle',
      cegDefault: false,
      cegSlot: '<i class="e-icon e-icon--lock e-icon--xs" aria-hidden="true"></i>',
      cegDependency: [{ name: 'type', value: 'detail' }],
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom CSS classes that can be added to the card.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the card. Example: {marginTop: '8px', width: '100%'}",
    },
  },
};

export { cardData };
