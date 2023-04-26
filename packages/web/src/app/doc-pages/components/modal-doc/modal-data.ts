import changelogJson from 'src/assets/changelogs/elvis-modal/CHANGELOG.json';
import ComponentData from '../component-data.interface';

const modalData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Modal',
  attributes: {
    isShowing: {
      isRequired: true,
      type: 'boolean',
      description: 'Controls if the modal is showing or not.',
    },
    heading: {
      isRequired: false,
      type: 'string',
      description: 'Heading for the modal.',
    },
    content: {
      isRequired: true,
      type: 'HTMLElement | JSX.Element',
      description: 'Text, images, tables or any other content (slot in webcomponent).',
    },
    illustration: {
      isRequired: false,
      type: 'HTMLElement | JSX.Element',
      description: 'Illustration/image to be shown in the modal (slot in webcomponent).',
    },
    primaryButton: {
      isRequired: false,
      type: 'HTMLElement | JSX.Element',
      description: 'Primary button placed to the right in the modal (slot in webcomponent).',
    },
    secondaryButton: {
      isRequired: false,
      type: 'HTMLElement | JSX.Element',
      description: 'Secondary button placed to the right in the modal (slot in webcomponent).',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom css classes that could be added to the modal.',
    },
    hasCloseButton: {
      isRequired: false,
      type: 'boolean',
      description:
        'Show close icon button inside the modal in the top right corner. Should only be used inside a multi-page modal.',
      default: 'false',
    },
    hasLockBodyScroll: {
      isRequired: false,
      type: 'boolean',
      description: 'Locks the body of your page so that you cant scroll while the modal is open.',
      default: 'true',
    },
    hasPadding: {
      isRequired: false,
      type: 'boolean',
      description: 'If the modal should have padding around the content',
      default: 'true',
    },
    disableClose: {
      isRequired: false,
      type: 'boolean',
      description:
        'Disables closing of modal, should only be used in special cases where closing the modal was not intended.',
      default: 'false',
    },
    disableBackdrop: {
      isRequired: false,
      type: 'boolean',
      description:
        'Removes the backdrop that is shown behind the modal. Should only be used in special cases where the backdrop was not intended.',
      default: 'false',
    },
    onClose: {
      isRequired: true,
      type: '() => void',
      description: 'Callback for every time the modal is being closed.',
    },
    maxWidth: {
      isRequired: false,
      type: 'string',
      description: 'Overwrite the max width of the modal (e.g. "100px", "90%").',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the modal. Example: {marginTop: '8px', width: '100%'}",
    },
  },
};

export { modalData };
