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
      description: 'Text, images, tables or any other content (slot in webcomponent)',
    },
    illustration: {
      isRequired: false,
      type: 'HTMLElement',
      description: 'Illustration/image to be shown in the modal (slot in webcomponent)',
    },
    primaryButton: {
      isRequired: false,
      type: 'HTMLElement',
      description: 'Primary button placed to the right in the modal (slot in webcomponent)',
    },
    secondaryButton: {
      isRequired: false,
      type: 'HTMLElement',
      description: 'Secondary button placed to the right in the modal (slot in webcomponent)',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom css classes that could be added to the modal',
    },
    hasCloseBtn: {
      isRequired: false,
      type: 'boolean',
      description: 'Show close icon button inside the modal in the top right corner.',
      displayName: 'Close button',
      default: 'false',
      cegType: 'boolean',
      cegFormType: 'checkbox',
      cegOption: 'true',
      cegDisplayGroup: 'Options',
    },
    hasLockBodyScroll: {
      isRequired: true,
      type: 'boolean',
      description: 'Locks the body of your page so that you cant scroll while the modal is open.',
      default: 'true',
    },
    onHide: {
      isRequired: true,
      type: '() => void',
      description: 'Callback for every time the modal is being closed.',
    },
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
    </button>
  }
  content={
    <div>Body text comes here and can go over several lines. It looks like this when it is two lines.</div>
  }
  illustration={
    <div>illustration</div>
  }
>
</Modal>`,
  codeAngular: `<elvia-modal
  (onHide)="isModalShowing = !isModalShowing"
  [isShowing]="isModalShowing"
  [title]="'Title of content'"
>
  <div slot="content">
    <div>Body text comes here and can go over several lines. It looks like this when it is two lines.</div>
  </div>
  <button slot="secondaryButton" class="e-btn e-btn--secondary e-btn--lg" (click)="isModalShowing = false">
    Cancel
  </button>
  <button slot="primaryButton" class="e-btn e-btn--primary e-btn--lg">Primary action</button>
  <div slot="illustration">
    Illustration
  </div>
</elvia-modal>
`,
  codeNativeHTML: `<button id="example-modal-button" class="e-btn">Åpne modal</button>
<elvia-modal
  id="example-elvia-modal"
>
  <div slot="content">
    <div>Body text comes here and can go over several lines. It looks like this when it is two lines.</div>
  </div>
  <button slot="secondaryButton" class="e-btn e-btn--secondary e-btn--lg">
    Cancel
  </button>
  <button slot="primaryButton" class="e-btn e-btn--primary e-btn--lg">Primary action</button>
  <div slot="illustration">
    <img alt="modal-illustration" src="./../../../../assets/modal/Empty state.png"/>
  </div>
</elvia-modal>
`,
  codeNativeScript: `  const modal = document.getElementById('example-elvia-modal');
  const button = document.getElementById('example-modal-button');
  let isModalShowing = false;

  modal.setProps({isShowing: isModalShowing });
  modal.setProps({title: "Title of content" });
  modal.addEventListener('onHide', () => {
    modal.setProps({isShowing: !isModalShowing });
    isModalShowing = !isModalShowing;
  });
  button.addEventListener("click", () => {
    modal.setProps({isShowing: !isModalShowing });
    isModalShowing = !isModalShowing;
  });
`,
};

export { modalData };
