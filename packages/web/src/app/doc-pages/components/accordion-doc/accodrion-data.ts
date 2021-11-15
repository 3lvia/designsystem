import { exampleContents } from 'src/app/shared/example-contents';

const accordionData = {
  name: 'elvis-accordion',
  elementNameW: 'elvia-accordion',
  elementNameR: 'Accordion',
  attributes: {
    type: {
      isRequired: false,
      type: '“normal” | “overflow”',
      description: 'Variants of accordion',
      default: '"normal"',
      displayName: 'Types',
      cegDefault: 0,
      cegType: 'string',
      cegFormType: 'type',
      cegOptions: ['normal', 'overflow'],
    },
    content: {
      isRequired: true,
      type: 'string | HTMLElement',
      description: 'Text, images, tables or any other content (use slot in webcomponent if not just text)',
    },
    openLabel: {
      isRequired: false,
      type: `string`,
      description: `Label for opening the accordion`,
    },
    closeLabel: {
      isRequired: false,
      type: `string`,
      description: `Label for closing the accordion`,
    },
    labelPosition: {
      isRequired: false,
      type: '“left” | “center” | “right”',
      description: 'Horizontal position of label & button',
      default: '"center"',
      displayName: 'position',
      cegDefault: 'center',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['left', 'center', 'right'],
    },
    size: {
      isRequired: false,
      type: '“small” | “medium” | “large”',
      description: 'Size of accordion label & button',
      default: '"medium"',
      displayName: 'Size',
      cegDefault: 'medium',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['small', 'medium', 'large'],
    },
  },
  package: 'npm install @elvia/elvis-accordion',
  codeImportReact: `import { Accordion } from '@elvia/elvis-accordion/react';`,
  codeImportWebComponent: `import '@elvia/elvis-accordion';`,
  codeReact:
    `<Accordion
  type={"normal"}
  openLabel={"Show"}
  closeLabel={"Hide"}
  labelPosition={"center"}
  size={"medium"}
  content={"` +
    exampleContents.texts.lg['eng-GBR'].description +
    `"}
></Accordion>
`,
  codeAngular:
    `<elvia-accordion
  [type]="'normal'"
  [openLabel]="'Show'"
  [closeLabel]="'Hide'"
  [labelPosition]="'center'"
  [size]="'medium'"
>
  <div slot="content">
    ` +
    exampleContents.texts.lg['eng-GBR'].description +
    `
  </div>
</elvia-accordion>
`,
  codeVue:
    `<elvia-accordion
  type="normal"
  openLabel="Show"
  closeLabel="Hide"
  labelPosition="center"
  size="medium"
>
  <div slot="content">
    ` +
    exampleContents.texts.lg['eng-GBR'].description +
    `
  </div>
</elvia-accordion>
`,
  codeNativeHTML:
    `<elvia-accordion
  type="normal"
  labelPosition="center"
  size="medium"
  id="example-elvia-accordion"
>
  <div slot="content">
    ` +
    exampleContents.texts.lg['eng-GBR'].description +
    `
  </div>
</elvia-accordion>
`,
  codeNativeScript: `  const accordion = document.getElementById('example-elvia-accordion');
  accordion.setProps({openLabel: 'Show' });
  accordion.setProps({closeLabel: 'Hide'});
`,
};

export { accordionData };
