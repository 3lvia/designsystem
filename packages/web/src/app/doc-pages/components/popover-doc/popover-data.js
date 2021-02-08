module.exports = {
  name: 'elvis-popover',
  elementNameW: 'elvia-popover',
  elementNameR: 'Popover',
  attributes: {
    title: {
      type: 'string',
      description: 'Title of content',
      name: 'Title',
      formType: 'toggle',
      option: 'Title',
      isRequired: false,
    },
    hasCloseBtn: {
      type: 'boolean',
      description: 'Determines if the close button in the upper right corner should be visible',
      default: 'true',
      name: 'Close button',
      formType: 'toggle',
      option: 'false',
      isRequired: false,
    },
    content: {
      type: 'string | HTMLElement',
      description: 'Text, images, tables or any other content (use slot in angular if not just text)',
      isRequired: true,
    },
    trigger: {
      type: 'HTMLElement',
      description: 'The element the user clicks to open the popover',
      isRequired: true,
    },
    posY: {
      type: '“bottom” | “top”',
      description: 'Position vertically',
      default: '“top”',
      name: 'Vertical position',
      formType: 'radio',
      options: ['top', 'bottom'],
      isRequired: false,
    },
    posX: {
      type: '“left” | “right” | “center”',
      description: 'Position horizontally',
      default: '“center”',
      name: 'Horizontal position',
      formType: 'radio',
      options: ['center', 'left', 'right'],
      isRequired: false,
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
