import { exampleContents } from 'src/app/shared/example-contents';
import changelogJson from 'src/assets/changelogs/elvis-popover/CHANGELOG.json';
import ComponentData from '../component-data.interface';

const popoverData: ComponentData = {
  changelog: changelogJson.content,
  name: 'elvis-popover',
  elementNameW: 'elvia-popover',
  elementNameR: 'Popover',
  attributes: {
    content: {
      isRequired: true,
      type: 'string | HTMLElement | JSX.Element',
      description: 'Text, images, tables or any other content (use slot in webcomponent if not just text).',
    },
    trigger: {
      isRequired: true,
      type: 'HTMLElement | JSX.Element',
      description: 'The element the user clicks to open the popover.',
    },
    heading: {
      isRequired: false,
      type: 'string',
      description: 'Heading of content.',
      cegDisplayName: 'Heading',
      cegType: 'string',
      cegFormType: 'toggle',
      cegDefault: true,
      cegOption: exampleContents.texts.md['eng-GBR'].title,
      cegDependency: [{ name: 'type', value: 'informative' }],
    },
    hasCloseButton: {
      isRequired: false,
      type: 'boolean',
      description: 'Determines if the close button in the upper right corner should be visible.',
      default: 'true',
      cegDisplayName: 'Close button',
      cegType: 'boolean',
      cegFormType: 'toggle',
      cegDefault: true,
      cegOption: 'false',
      cegDependency: [{ name: 'type', value: 'informative' }],
    },
    hasDivider: {
      isRequired: false,
      type: 'boolean',
      description:
        'With type list you can add a divider to group content. The divider will appear between each "ewc-popover__list-group" element section.',
      default: 'true',
      cegDisplayName: 'Divider',
      cegType: 'boolean',
      cegFormType: 'toggle',
      cegDefault: false,
      cegOption: 'true',
      cegDependency: [{ name: 'type', value: 'list' }],
    },
    isShowing: {
      isRequired: false,
      type: 'boolean',
      description: 'Determines the popover is showing or not.',
      default: 'false',
    },
    onOpen: {
      isRequired: false,
      type: '() => void',
      description: 'Callback for every time the popover is being opened.',
    },
    onClose: {
      isRequired: false,
      type: '() => void',
      description: 'Callback for every time the popover is being closed.',
    },
    verticalPosition: {
      isRequired: false,
      type: 'bottom | top',
      description: 'Position vertically.',
      default: 'top',
      cegDisplayName: 'Vertical position',
      cegDefault: 'top',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['top', 'bottom'],
    },
    horizontalPosition: {
      isRequired: false,
      type: 'left | center | right',
      description: 'Position horizontally.',
      default: 'center',
      cegDisplayName: 'Horizontal position',
      cegDefault: 'center',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['left', 'center', 'right'],
    },
    disableAutoClose: {
      isRequired: false,
      type: 'boolean',
      description:
        'If true, closes the popover whenever the user clicks anywhere inside the popover. Set to false if you want to control the closing yourself with isShowing property.',
      default: 'true',
    },
    className: {
      isRequired: false,
      type: 'string',
      description:
        'Custom CSS classes that can be added to the popover. Note: This applies to the content, not the trigger.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the popover. Example: {marginTop: '8px', width: '100%'}. Note: This applies to the content, not the trigger.",
    },
  },
  // Not used here, as there are separate files with code for each component type.
  codeReact: ``,
  codeAngular: ``,
  codeVue: ``,
  codeNativeHTML: ``,
  codeNativeScript: `  const popover = document.getElementById('example-elvia-popover');
  const popoverTrigger = document.getElementById('popover-trigger-button');
  popover.addEventListener('onOpen', () => {
    console.log('Do what you want when popover is opened.');
    popoverTrigger.classList.add('e-btn---selected');
  });
  popover.addEventListener('onClose', () => {
    console.log('Do what you want when popover is closed.');
    popoverTrigger.classList.remove('e-btn---selected');
  });
`,
};

export { popoverData };
