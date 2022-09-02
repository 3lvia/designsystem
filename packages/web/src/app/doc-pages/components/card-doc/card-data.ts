import changelogJson from 'src/assets/changelogs/elvis-card/CHANGELOG.json';
import ComponentData from '../component-data.interface';

const cardData: ComponentData = {
  name: 'elvis-card',
  elementNameW: 'elvia-card',
  elementNameR: 'Card',
  attributes: {
    icon: {
      isRequired: false,
      type: 'string | HTMLElement | JSX.Element',
      description: 'Text or icon (use slot in webcomponent if not just text).',
    },
    heading: {
      isRequired: false,
      type: 'string',
      description: 'Card heading.',
    },
    description: {
      isRequired: false,
      type: 'string',
      description: 'Description text, keep it short if not detail card.',
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
    minWidth: {
      isRequired: false,
      type: 'number',
      default: '112 | 250',
      description: 'Minimum width of card in px, cannot be less than 112 (or 250 for detail type card).',
    },
    maxWidth: {
      isRequired: false,
      type: 'number',
      default: '175',
      description: 'Maximum width of card in px, cannot be more than 400.',
    },
    maxDescriptionLines: {
      isRequired: false,
      type: 'number',
      default: '3',
      description: 'Max number of text lines in description. Overflow is clamped with an ellipsis.',
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
  package: 'npm install @elvia/elvis-card',
  codeImportReact: `import { Card } from '@elvia/elvis-card/react';`,
  codeImportTypescriptInterface: `import { CardProps } from '@elvia/elvis-card/react';`,
  codeImportWebComponent: `import '@elvia/elvis-card';`,
  changelog: changelogJson.content,

  // Not used here, as there are separate files with code for each component type.
  codeReact: ``,
  codeAngular: ``,
  codeVue: ``,
  codeNativeHTML: ``,
  codeNativeScript: ``,
};

export { cardData };
