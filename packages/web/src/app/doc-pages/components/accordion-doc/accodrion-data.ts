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
      description: `Label for opening the accordion. Will also set the aria-label of the button opening the accordion. NB: the prop ariaLabelOpen has higher priority and will overwrite the aria-label.`,
    },
    closeLabel: {
      isRequired: false,
      type: `string`,
      description: `Label for closing the accordion. Will also set the aria-label of the button closing the accordion. NB: the prop ariaLabelClose has higher priority and will overwrite the aria-label.`,
    },
    labelPosition: {
      isRequired: false,
      type: '“left” | “center” | “right”',
      description: 'Horizontal position of label & button',
      default: '"center"',
      cegDisplayName: 'position',
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
      cegDisplayName: 'Size',
      cegDefault: 'medium',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['small', 'medium', 'large'],
    },
    openAriaLabel: {
      isRequired: false,
      type: `string`,
      description: `Aria-label for the button opening the accordion.`,
    },
    closeAriaLabel: {
      isRequired: false,
      type: `string`,
      description: `Aria-label for the button closing the accordion. `,
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom css classes that can be added to the accordion.',
    },
    inlineStyle: {
      isRequired: false,
      type: 'string',
      description: 'Custom css style that can be added to the accordion.',
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
  :type="'normal'"
  :openLabel="'Show'"
  :closeLabel="'Hide'"
  :labelPosition="'center'"
  :size="'medium'"
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
  changelog: '',
};

export { accordionData };
