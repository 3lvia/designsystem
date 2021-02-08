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
      options: ['title'],
    },
    content: {
      type: 'string | HTMLElement',
      description: 'Text, images, tables or any other content (use slot in angular if not just text)',
    },
    trigger: {
      type: 'HTMLElement',
      description: 'The element the user clicks to open the popover',
    },
    posX: {
      type: '“left” | “right” | “center”',
      description: 'Position horizontally',
      default: '“center”',
      name: 'Horizontal position',
      formType: 'radio',
      options: ['center', 'left', 'right'],
    },
    posY: {
      type: '“bottom” | “top”',
      description: 'Position vertically',
      default: '“top”',
      name: 'Vertical position',
      formType: 'radio',
      options: ['top', 'bottom'],
    },
    hasCloseBtn: {
      type: 'boolean',
      description: 'Determines if the close button in the upper right corner should be visible',
      default: 'true',
    },
  },
  codeInstallation: ``,
  codeReact: ``,
  codeWebComponent: ``,
};
