import { exampleContents } from 'src/app/shared/example-contents';

const accordionData = {
  name: 'elvis-accordion',
  elementNameW: 'elvia-accordion',
  elementNameR: 'Accordion',
  attributes: {
    content: {
      isRequired: true,
      type: 'string | HTMLElement',
      description: 'Text, images, tables or any other content (use slot in angular if not just text)',
    },
    label: {
      isRequired: false,
      type: 'string[]',
      description:
        'Label for the accordion. Index 0 refers to label while accordion is closed, index 1 refers to label when the accordion is open.',
      default: '["Show","Hide"]',
    },
    position: {
      isRequired: false,
      type: '“left” | “center” | “right”',
      description: 'Horizontal positon of label & button',
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
    type: {
      isRequired: false,
      type: '“normal” | “overflow”',
      description: 'Variants of accordion',
      default: '"normal"',
      displayName: 'Variants',
      cegDefault: 'normal',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['normal', 'overflow'],
    },
  },
  package: 'npm install @elvia/elvis-accordion',
  codeImportReact: `import { Accordion } from '@elvia/elvis-accordion/react';`,
  codeImportWebComponent: `import '@elvia/elvis-accordion';`,
  codeReact:
    `<Accordion
  type="normal"
  position="center"
  size="medium"
  content="` +
    exampleContents.texts.lg['eng-GBR'].description +
    `"
></Accordion>`,
  codeWebComponent:
    `<elvia-accordion
  type="normal"
  position="center"
  size="medium"
  >
  <div slot="content">
   ` +
    exampleContents.texts.lg['eng-GBR'].description +
    `
  </div>
</elvia-accordion>`,
};

export { accordionData };
