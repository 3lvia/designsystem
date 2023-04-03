import changelogJson from 'src/assets/changelogs/elvis-popover/CHANGELOG.json';
import ComponentData from '../component-data.interface';

const popoverData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Popover',
  attributes: {
    content: {
      isRequired: true,
      type: 'string | HTMLElement | JSX.Element',
      description: 'Text, images, tables or any other content (use slot in web component if not just text).',
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
    },
    hasCloseButton: {
      isRequired: false,
      type: 'boolean',
      description: 'Determines if the close button in the upper right corner should be visible.',
      default: 'true',
    },
    isShowing: {
      isRequired: false,
      type: 'boolean',
      description: 'Determines if the popover is visible.',
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
    },
    horizontalPosition: {
      isRequired: false,
      type: 'left | center | right',
      description: 'Position horizontally.',
      default: 'center',
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
};

export { popoverData };
