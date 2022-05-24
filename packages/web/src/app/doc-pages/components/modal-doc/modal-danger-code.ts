import ComponentTypeData from '../component-type-data.interface';

const modalDangerCode: ComponentTypeData = {
  type: 'danger',
  codeReact: `<button onClick={() => setIsModalShowingState(true)} className="e-btn">Åpne modal</button>
<Modal
  isShowing={isModalShowing}
  onClose={() => setIsModalShowingState(false)}
  heading="Title of content"
  primaryButton={
    <button
      onClick={() => setIsModalShowingState(false)}
      className="e-btn e-btn--danger e-btn--lg">
      Danger action
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
  <button slot="primaryButton" class="e-btn e-btn--danger e-btn--lg">Danger action</button>
</elvia-modal>`,
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
  <button slot="primaryButton" class="e-btn e-btn--danger e-btn--lg">Danger action</button>
</elvia-modal>`,
  codeNativeHTML: `<button id="example-modal-button" class="e-btn">Åpne modal</button>
<elvia-modal
  id="example-elvia-modal"
>
  <div slot="content">
    <div>Body text comes here and can go over several lines. It looks like this when it is two lines.</div>
  </div>
  <button id="close-button" slot="secondaryButton" class="e-btn e-btn--secondary e-btn--lg">
    Cancel
  </button>
  <button slot="primaryButton" class="e-btn e-btn--danger e-btn--lg">Danger action</button>
</elvia-modal>
`,
};

export { modalDangerCode };
