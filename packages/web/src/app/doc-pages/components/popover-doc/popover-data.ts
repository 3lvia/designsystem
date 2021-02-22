import { exampleContents } from 'src/app/shared/example-contents';

const popoverData = {
  name: 'elvis-popover',
  elementNameW: 'elvia-popover',
  elementNameR: 'Popover',
  attributes: {
    title: {
      isRequired: false,
      type: 'string',
      description: 'Title of content',
      displayName: 'Title',
      cegType: 'string',
      cegFormType: 'toggle',
      cegDefault: 'true',
      cegOption: 'Title',
    },
    hasCloseBtn: {
      isRequired: false,
      type: 'boolean',
      description: 'Determines if the close button in the upper right corner should be visible',
      default: 'true',
      displayName: 'Close button',
      cegType: 'boolean',
      cegFormType: 'toggle',
      cegDefault: 'true',
      cegOption: 'false',
    },
    content: {
      isRequired: true,
      type: 'string | HTMLElement',
      description: 'Text, images, tables or any other content (use slot in angular if not just text)',
    },
    trigger: {
      isRequired: true,
      type: 'HTMLElement',
      description: 'The element the user clicks to open the popover',
    },
    posY: {
      isRequired: false,
      type: '“bottom” | “top”',
      description: 'Position vertically',
      default: '“top”',
      displayName: 'Vertical position',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['top', 'bottom'],
    },
    posX: {
      isRequired: false,
      type: '“left” | “right” | “center”',
      description: 'Position horizontally',
      default: '“center”',
      displayName: 'Horizontal position',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['center', 'left', 'right'],
    },
  },
  package: 'npm install @elvia/elvis-popover',
  codeImportReact: `import { Popover } from '@elvia/elvis-popover/react';`,
  codeImportWebComponent: `import '@elvia/elvis-popover';`,
  codeReact:
    `<Popover
  title="` +
    exampleContents.texts.md['eng-GBR'].title +
    `"
  content="` +
    exampleContents.texts.md['eng-GBR'].description +
    `"
  posY="top"
  trigger={
    <button class="e-btn e-btn--icon e-btn--circled">
      <span class="e-btn__icon">
        <i class="e-icon e-icon--information_circle"></i>
        <i class="e-icon e-icon e-icon--information_circle-filled-color"></i>
      </span>
    </button>
  }
></Popover>`,
  codeWebComponent:
    `<elvia-popover 
  title="` +
    exampleContents.texts.md['eng-GBR'].title +
    `" 
  content="` +
    exampleContents.texts.md['eng-GBR'].description +
    `" 
  posY="top"
>
  <button slot="trigger" class="e-btn e-btn--icon e-btn--circled">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--information_circle"></i>
      <i class="e-icon e-icon e-icon--information_circle-filled-color"></i>
    </span>
  </button>
</elvia-popover>`,
};

export { popoverData };
