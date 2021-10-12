const modalIllustrationCode = {
  name: 'elvis-modal',
  elementNameW: 'elvia-modal',
  elementNameR: 'Modal',
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
      <img alt="modal-illustration" src="./../../../../assets/modal/Empty state.png"/>
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
      <img alt="modal-illustration" src="./../../../../assets/modal/Empty state.png"/>
    </div>
  </elvia-modal>`,
  codeNativeHTML: `<button id="example-modal-button-illustration" class="e-btn">Åpne modal</button>
  <elvia-modal
    id="example-elvia-modal-illustration"
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
  codeNativeScript: `  const modal = document.getElementById('example-elvia-modal-illustration');
    const button = document.getElementById('example-modal-button-illustration');
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

export { modalIllustrationCode };
