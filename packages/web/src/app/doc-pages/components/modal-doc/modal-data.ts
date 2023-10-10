import changelogJson from '@elvia/elvis-modal/CHANGELOG.json';
import ComponentData from '../component-data.interface';
import { BaseModalProps } from '@elvia/elvis-modal/react';

const modalData: ComponentData<BaseModalProps> = {
  changelog: changelogJson.content,
  name: 'Modal',
  attributes: {
    isShowing: {
      isRequired: true,
      type: 'boolean',
      description: 'Controls if the modal is showing or not.',
    },
    heading: {
      type: 'string',
      description: 'Heading for the modal.',
    },
    content: {
      isRequired: true,
      type: 'HTMLElement | JSX.Element',
      description: 'Text, images, tables or any other content (slot in webcomponent).',
    },
    illustration: {
      type: 'HTMLElement | JSX.Element',
      description: 'Illustration/image to be shown in the modal (slot in webcomponent).',
    },
    primaryButton: {
      type: 'HTMLElement | JSX.Element',
      description: 'Primary button placed to the right in the modal (slot in webcomponent).',
    },
    secondaryButton: {
      type: 'HTMLElement | JSX.Element',
      description: 'Secondary button placed to the left in the modal (slot in webcomponent).',
    },
    hasCloseButton: {
      type: 'boolean',
      description:
        'Show close icon button inside the modal in the top right corner. Should only be used inside a multi-page modal.',
      default: 'false',
    },
    hasLockBodyScroll: {
      type: 'boolean',
      description: 'Locks the body of your page so that you cant scroll while the modal is open.',
      default: 'true',
    },
    hasPadding: {
      type: 'boolean',
      description: 'If the modal should have padding around the content',
      default: 'true',
    },
    disableClose: {
      type: 'boolean',
      description:
        'Disables closing of modal, should only be used in special cases where closing the modal was not intended.',
      default: 'false',
    },
    disableBackdrop: {
      type: 'boolean',
      description:
        'Removes the backdrop that is shown behind the modal. Should only be used in special cases where the backdrop was not intended.',
      default: 'false',
    },
    onClose: {
      isEvent: true,
      isRequired: true,
      type: '() => void',
      description: 'Callback for every time the modal is being closed.',
    },
    maxWidth: {
      type: 'string',
      description: 'Overwrite the max width of the modal (e.g. "100px", "90%").',
    },
  },
};

export { modalData };
