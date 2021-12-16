import { exampleContents } from 'src/app/shared/example-contents';

const cardData = {
  name: 'elvis-card',
  elementNameW: 'elvia-card',
  elementNameR: 'Card',
  attributes: {
    icon: {
      isRequired: true,
      type: 'string | HTMLElement',
      description: 'Text or icon (use slot in webcomponent if not just text)',
    },
    type: {
      isRequired: false,
      type: 'simple | detail',
      description: 'Variants of card',
      default: 'simple',
      cegDisplayName: 'Types',
      cegDefault: 0,
      cegType: 'string',
      cegFormType: 'type',
      cegOptions: ['simple', 'detail'],
    },
    shape: {
      isRequired: false,
      type: 'square | circle',
      description: 'Shapes of card',
      default: 'square',
      cegDisplayName: 'Shape',
      cegDefault: 'square',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['square', 'circle'],
      cegDependency: { name: 'type', value: 'simple' },
    },
    header: {
      isRequired: false,
      type: 'string',
      description: 'Card header',
    },
    description: {
      isRequired: false,
      type: 'string',
      description: 'Description text, keep it short if not detail card',
    },
    borderColor: {
      isRequired: false,
      type: 'green | blue-berry | red | orange',
      description: 'Color on top of the card',
      cegDisplayName: 'Border color',
      cegDefault: 'none',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['none', 'green', 'blue-berry', 'red', 'orange'],
      cegDependency: { name: 'type', value: 'simple' },
    },
    hasBorder: {
      isRequired: false,
      type: 'boolean',
      description: 'If the card is on a light grey background this prop should be set to false',
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
      description: 'Override width of card. Any css length value is accepted (e.g. 150px, 20vw, 75%)',
    },
    minWidth: {
      isRequired: false,
      type: 'number',
      default: '112',
      description: 'Minimum width of card in px, cannot be less than 112',
    },
    maxWidth: {
      isRequired: false,
      type: 'number',
      default: '400',
      description: 'Maximum width of card in px, cannot be more than 400',
    },
    maxDescriptionLines: {
      isRequired: false,
      type: 'number',
      default: '5',
      description: 'Max number of text lines in description. Overflow is clamped with an ellipsis',
    },
    label: {
      isRequired: false,
      type: 'string',
      description: 'Label on bottom of card, only available on detail card',
    },
    iconHover: {
      isRequired: false,
      type: 'string | HTMLElement',
      description: 'Text or icon to swap icon for on hover (use slot in webcomponent if not just text)',
      cegDisplayName: 'Hover Icon',
      cegType: 'boolean',
      cegFormType: 'toggle',
      cegDefault: 'false',
      cegOption: 'true',
      cegSlot: '<i class="e-icon e-icon--information_circle-filled-color e-icon--md"></i>',
      cegDependency: { name: 'type', value: 'simple' },
    },
    cornerIcon: {
      isRequired: false,
      type: 'string | HTMLElement',
      description: 'Icon on upper right corner of card (use slot in webcomponent)',
      cegDisplayName: 'Corner Icon',
      cegType: 'boolean',
      cegFormType: 'toggle',
      cegDefault: 'false',
      cegOption: 'true',
      cegSlot: '<i class="e-icon e-icon--lock e-icon--xs"></i>',
      cegDependency: { name: 'type', value: 'detail' },
    },
  },
  package: 'npm install @elvia/elvis-card',
  codeImportReact: `import { Card } from '@elvia/elvis-card/react';`,
  codeImportWebComponent: `import '@elvia/elvis-card';`,
  codeReact:
    `<Card 
  icon={<i class="e-icon e-icon--information_circle e-icon--md"></i>}
  header={"` +
    exampleContents.texts.lg['eng-GBR'].title +
    `"}
  description={"` +
    exampleContents.texts.lg['eng-GBR'].description +
    `"}
></Card>
`,
  codeAngular:
    `<elvia-card
  [header]='"` +
    exampleContents.texts.lg['eng-GBR'].title +
    `"'
  [description]='"` +
    exampleContents.texts.lg['eng-GBR'].description +
    `"'
>
  <i slot="icon" class="e-icon e-icon--information_circle e-icon--md"></i>
</elvia-card>
`,
  codeNativeHTML:
    `<elvia-card
  header="` +
    exampleContents.texts.md['eng-GBR'].title +
    `"
  description="` +
    exampleContents.texts.md['eng-GBR'].description +
    `"
  id="example-elvia-card"
>
  <i slot="icon" class="e-icon e-icon--information_circle e-icon--md"></i>
</elvia-card>
`,
  codeNativeScript: `  const card = document.getElementById('example-elvia-card');
`,
};

export { cardData };
