import changelogJson from 'src/assets/changelogs/elvis-modal/CHANGELOG.json';
import ComponentData from '../component-data.interface';

const modalData: ComponentData = {
  name: 'elvis-modal',
  elementNameW: 'elvia-modal',
  elementNameR: 'Modal',
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
      cegDisplayName: 'Illustration',
      cegType: 'boolean',
      cegFormType: 'toggle',
      cegDefault: false,
      cegSlot: '<img alt="modal-illustration" src="./../../../../assets/modal/Empty state.png"/>',
      cegDependency: [{ name: 'type', value: ['actions', 'info'] }],
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
      default: 'true',
      cegDisplayName: 'Close button',
      cegType: 'boolean',
      cegFormType: 'toggle',
      cegDefault: false,
      cegOption: 'true',
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
  package: 'npm install @elvia/elvis-modal',
  codeImportReact: `import { Modal } from '@elvia/elvis-modal/react';`,
  codeImportTypescriptInterface: `import { ModalProps } from '@elvia/elvis-modal/react';`,
  codeImportWebComponent: `import '@elvia/elvis-modal';`,
  codeReact: `<button onClick={() => setIsModalShowingState(true)} className="e-btn">Åpne modal</button>
<Modal
  isShowing={isModalShowing}
  onClose={() => setIsModalShowingState(false)}
  heading="Title of content"
  primaryButton={
    <button
      onClick={() => setIsModalShowingState(false)}
      className="e-btn e-btn--primary e-btn--lg">
      Primary
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
  (onClose)="isModalShowing = !isModalShowing"
  [isShowing]="isModalShowing"
  [heading]="'Title of content'"
>
  <div slot="content">
    <div>Body text comes here and can go over several lines. It looks like this when it is two lines.</div>
  </div>
  <button slot="secondaryButton" class="e-btn e-btn--secondary e-btn--lg" (click)="isModalShowing = false">
    Cancel
  </button>
  <button slot="primaryButton" class="e-btn e-btn--primary e-btn--lg">Primary</button>
</elvia-modal>
`,
  codeVue: `<button @click="isModalShowing = true" class="e-btn">Åpne modal</button>
<elvia-modal
  @on-close="isModalShowing = !isModalShowing"
  :isShowing="isModalShowing"
  :heading="'Title of content'"
>
  <div slot="content">
    <div>Body text comes here and can go over several lines. It looks like this when it is two lines.</div>
  </div>
  <button slot="secondaryButton" class="e-btn e-btn--secondary e-btn--lg" @click="isModalShowing = false">
    Cancel
  </button>
  <button slot="primaryButton" class="e-btn e-btn--primary e-btn--lg">Primary</button>
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
  <button slot="primaryButton" class="e-btn e-btn--primary e-btn--lg">Primary</button>
</elvia-modal>
`,
  codeNativeScript: `  const modal = document.getElementById('example-elvia-modal');
  const button = document.getElementById('example-modal-button');
  let isModalShowing = false;

  modal.setProps({isShowing: isModalShowing });
  modal.setProps({heading: "Title of content" });
  modal.addEventListener('onClose', () => {
    modal.setProps({isShowing: !isModalShowing });
    isModalShowing = !isModalShowing;
  });
  button.addEventListener("click", () => {
    modal.setProps({isShowing: !isModalShowing });
    isModalShowing = !isModalShowing;
    
    setTimeout(() => {
      const secondaryButton = document.getElementById('close-button');
      secondaryButton.addEventListener("click", () => {
        modal.setProps({isShowing: false });
        isModalShowing = false;
      });
    }, 500);
  });
`,
  changelog: changelogJson.content,
};

export { modalData };
