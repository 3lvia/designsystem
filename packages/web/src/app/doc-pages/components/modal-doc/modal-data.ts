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
      cegDisplayName: 'Illustration',
      cegType: 'boolean',
      cegFormType: 'toggle',
      cegDefault: 'false',
      cegOption: 'true',
      cegSlot: '<img alt="modal-illustration" src="./../../../../assets/modal/Empty state.png"/>',
      cegDependency: [{ name: 'type', value: ['actions', 'info'] }],
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
      description:
        'Show close icon button inside the modal in the top right corner. Should only be used inside a multi-page modal.',
      default: 'true',
    },
    hasLockBodyScroll: {
      isRequired: false,
      type: 'boolean',
      description: 'Locks the body of your page so that you cant scroll while the modal is open.',
      default: 'true',
    },
    disableClose: {
      isRequired: false,
      type: 'boolean',
      description:
        'Disables closing of modal, should only be used in special cases where closing the modal was not intended.',
      default: 'false',
    },
    onHide: {
      isRequired: true,
      type: '() => void',
      description: 'Callback for every time the modal is being closed.',
    },
    maxWidth: {
      isRequired: false,
      type: 'string | undefined',
      description: 'Overwrite the max width of the modal (e.g. "100px", "90%").',
    },
  },
  package: 'npm install @elvia/elvis-modal',
  codeImportReact: `import { Modal } from '@elvia/elvis-modal/react';`,
  codeImportWebComponent: `import '@elvia/elvis-modal';`,
  codeReact: `<button onClick={() => setIsModalShowingState(true)} class="e-btn">Åpne modal</button>
<Modal
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
>
</Modal>`,
  codeAngular: `<button (click)="isModalShowing = true" class="e-btn">Åpne modal</button>
<elvia-modal
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
</elvia-modal>
`,
  codeVue: `<button @click="isModalShowing = true" class="e-btn">Åpne modal</button>
<elvia-modal
  @on-hide="isModalShowing = !isModalShowing"
  :isShowing="isModalShowing"
  :title="'Title of content'"
>
  <div slot="content">
    <div>Body text comes here and can go over several lines. It looks like this when it is two lines.</div>
  </div>
  <button slot="secondaryButton" class="e-btn e-btn--secondary e-btn--lg" @click="isModalShowing = false">
    Cancel
  </button>
  <button slot="primaryButton" class="e-btn e-btn--primary e-btn--lg">Primary action</button>
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
