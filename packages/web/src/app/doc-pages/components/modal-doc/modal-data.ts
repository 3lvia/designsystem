const modalData = {
  name: 'elvis-modal',
  elementNameW: 'elvia-modal',
  elementNameR: 'Modal',
  attributes: {
    isShowing: { isRequired: true, type: 'boolean', description: 'Controls if the modal is showing or not' },
    title: {
      isRequired: false,
      type: 'string',
      description: 'Title for the modal',
    },
    content: {
      isRequired: true,
      type: 'HTMLElement',
      description: 'Text, images, tables or any other content (slot in angular)',
    },
    illustration: {
      isRequired: false,
      type: 'HTMLElement',
      description: 'Illustration/image to be shown in the modal (slot in angular)',
    },
    primaryButton: {
      isRequired: false,
      type: 'HTMLElement',
      description: 'Primary button placed to the right in the modal (slot in angular)',
    },
    secondaryButton: {
      isRequired: false,
      type: 'HTMLElement',
      description: 'Secondary button placed to the right in the modal (slot in angular)',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom css classes that could be added to the modal',
    },
    hasCloseButton: {
      isRequired: false,
      type: 'boolean',
      description: 'Show close icon button inside the modal in the top right corner.',
      default: false,
    },
    onHide: {
      isRequired: true,
      type: '() => void',
      description: 'Callback for every time the modal is being closed.',
    }
  },
  package: 'npm install @elvia/elvis-modal',
  codeImportReact: `import { Modal } from '@elvia/elvis-modal/react';`,
  codeImportWebComponent: `import '@elvia/elvis-modal';`,
  codeReact: `<Modal
  isShowing={isModalShowing}
  onHide={() => setIsModalShowingState(false)}
  title="Title of content"
  primaryButton={
    <button
      onClick={() => setIsModalShowingState(false)}
      className="e-btn e-btn--primary e-btn--lg">
      Primary action
    </button>
  }
  secondaryButton={
    <button
      onClick={() => setIsModalShowingState(false)}
      className="e-btn e-btn--secondary e-btn--lg">
      Cancel
    </button>}
  content={
    <>
      <div>Body text comes here and can go over several lines. It looks like this when it is two lines.</div>
    </>
  }
>
</Modal>`,
  codeWebComponent: `<elvia-modal
  (onHide)="isModalShowing = !isModalShowing"
  [isShowing]="isModalShowing"
  title="Title of content"
>
  <div slot="content">
    <div>Body text comes here and can go over several lines. It looks like this when it is two lines.</div>
  </div>
  <button slot="secondaryButton" class="e-btn e-btn--secondary e-btn--lg" (click)="isModalShowing = false">
    Cancel
  </button>
  <button slot="primaryButton" class="e-btn e-btn--primary e-btn--lg">Primary action</button>
</elvia-modal>`,
};

export { modalData };
