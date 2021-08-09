import { exampleContents } from 'src/app/shared/example-contents';

const popoverData = {
  name: 'elvis-popover',
  elementNameW: 'elvia-popover',
  elementNameR: 'Popover',
  attributes: {
    header: {
      isRequired: false,
      type: 'string',
      description: 'Header of content',
      displayName: 'Header',
      cegType: 'string',
      cegFormType: 'toggle',
      cegDefault: 'true',
      cegOption: exampleContents.texts.md['eng-GBR'].title,
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
    isShowing: {
      isRequired: false,
      type: 'boolean',
      description: 'Determines the popover is showing or not.',
      default: 'false',
    },
    isShowingOnChange: {
      isRequired: false,
      type: '(isShowing: boolean) => void',
      description: 'Gets called every time the isShowing value is changed.',
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
      cegDefault: 'top',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['top', 'bottom'],
    },
    posX: {
      isRequired: false,
      type: '“left” | “center” | “right”',
      description: 'Position horizontally',
      default: '“center”',
      displayName: 'Horizontal position',
      cegDefault: 'center',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['left', 'center', 'right'],
    },
  },
  package: 'npm install @elvia/elvis-popover',
  codeImportReact: `import { Popover } from '@elvia/elvis-popover/react';`,
  codeImportWebComponent: `import '@elvia/elvis-popover';`,
  codeReact:
    `<Popover
  header="` +
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
  header="` +
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
