module.exports = {
  name: 'elvis-popover',
  elementNameW: 'elvia-popover',
  elementNameR: 'Popover',
  attributes: {
    title: {
      isRequired: false,
      type: 'string',
      description: 'Title of content',
      displayName: 'Title',
      cegFormType: 'toggle',
      cegOption: 'Title',
    },
    hasCloseBtn: {
      isRequired: false,
      type: 'boolean',
      description: 'Determines if the close button in the upper right corner should be visible',
      default: 'true',
      displayName: 'Close button',
      cegFormType: 'toggle',
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
      cegFormType: 'radio',
      cegOptions: ['top', 'bottom'],
    },
    posX: {
      isRequired: false,
      type: '“left” | “right” | “center”',
      description: 'Position horizontally',
      default: '“center”',
      displayName: 'Horizontal position',
      cegFormType: 'radio',
      cegOptions: ['center', 'left', 'right'],
    },
  },
  codeInstallation: `//REACT
import { Popover } from '@elvia/elvis-popover/react';

// WEBCOMPONENT
import { Popover } from '@elvia/elvis-popover';`,
  codeReact: `<Popover
  title="Title"
  content="Test av popover component."
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
  codeWebComponent: `<elvia-popover 
  title="Title" 
  content="Test av popover component." 
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
