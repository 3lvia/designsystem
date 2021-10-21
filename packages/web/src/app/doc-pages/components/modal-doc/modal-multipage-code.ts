const modalMultipageCode = {
  name: 'elvis-modal',
  elementNameW: 'elvia-modal',
  elementNameR: 'Modal',
  codeReact: `<button onClick={() => setIsModalShowingState(true)} class="e-btn">Åpne modal</button>
<Modal
  isShowing={isModalShowing}
  onHide={() => setIsModalShowingState(false)}
  title="Title of content"
  hasCloseBtn={true}
  content={
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
      <div>Body text comes here and can go over several lines. It looks like this when it is two lines.</div>
      <Carousel elements="4"></Carousel>
    </div>
  }
  illustration={
    <img alt="modal-illustration" src="./../../../../assets/modal/Empty state.png"/>
  }
>
</Modal>`,
  codeAngular: `<button (click)="isModalShowing = true" class="e-btn">Åpne modal</button>
<elvia-modal
  (onHide)="isModalShowing = !isModalShowing"
  [isShowing]="isModalShowing"
  [title]="'Title of content'"
  [hasCloseBtn]="true"
>
  <div slot="content" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%">
    <div>Body text comes here and can go over several lines. It looks like this when it is two lines.</div>
    <elvia-carousel elements="4"></elvia-carousel>
  </div>
  <div slot="illustration">
    <img alt="modal-illustration" src="./../../../../assets/modal/Empty state.png"/>
  </div>
</elvia-modal>`,
  codeNativeHTML: `<button id="example-modal-button-multipage" class="e-btn">Åpne modal</button>
<elvia-modal
  id="example-elvia-modal-multipage"
>
  <div slot="content" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%">
    <div>Body text comes here and can go over several lines. It looks like this when it is two lines.</div>
    <elvia-carousel elements="4"></elvia-carousel>
  </div>
  <div slot="illustration">
    <img alt="modal-illustration" src="./../../../../assets/modal/Empty state.png"/>
  </div>
</elvia-modal>
`,
  codeNativeScript: `  const modal = document.getElementById('example-elvia-modal-multipage');
  const button = document.getElementById('example-modal-button-multipage');
  let isModalShowing = false;

  modal.setProps({hasCloseBtn: true });
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

export { modalMultipageCode };
