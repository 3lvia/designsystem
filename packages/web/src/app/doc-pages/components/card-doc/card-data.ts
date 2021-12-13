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
      cegDefault: ' ',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: [' ', 'green', 'blue-berry', 'red', 'orange'],
    },
    isInverted: {
      isRequired: false,
      type: 'boolean',
      description: 'If the card is on a dark grey background this prop should be used',
      default: 'false',
      cegDefault: 0,
      cegType: 'boolean',
      cegFormType: 'background',
      cegOptions: ['White', 'Dark grey'],
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
    cornerIcon: {
      isRequired: false,
      type: 'string',
      description: 'Icon on upper right corner of card (use slot in webcomponent)',
    },
  },
  package: 'npm install @elvia/elvis-card',
  codeImportReact: `import { Card } from '@elvia/elvis-card/react';`,
  codeImportWebComponent: `import '@elvia/elvis-card';`,
  codeReact:
    `<Card 
  icon={"13"}
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
  [icon]='"13"'
  [header]='"` +
    exampleContents.texts.lg['eng-GBR'].title +
    `"'
  [description]='"` +
    exampleContents.texts.lg['eng-GBR'].description +
    `"'
>
</elvia-card>
`,
  codeNativeHTML:
    `<elvia-card  
  icon="13"
  header="` +
    exampleContents.texts.lg['eng-GBR'].title +
    `"
  description="` +
    exampleContents.texts.lg['eng-GBR'].description +
    `"
  id="example-elvia-card"
  
>
  <i slot="cornerIcon" class="e-icon e-icon--lock e-icon--xs"></i>
</elvia-card>
`,
  codeNativeScript: `  const card = document.getElementById('example-elvia-card');
`,
};

export { cardData };
