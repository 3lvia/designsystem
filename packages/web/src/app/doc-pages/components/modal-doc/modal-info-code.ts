import ComponentTypeData from '../component-type-data.interface';

const modalInfoCode: ComponentTypeData = {
  type: 'info',
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
  <button slot="primaryButton" class="e-btn e-btn--primary e-btn--lg">Primary</button>
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
  <button slot="primaryButton" class="e-btn e-btn--primary e-btn--lg">Primary</button>
</elvia-modal>`,
  codeNativeHTML: `<button id="example-modal-button" class="e-btn">Åpne modal</button>
<elvia-modal
  id="example-elvia-modal"
>
  <div slot="content">
    <div>Body text comes here and can go over several lines. It looks like this when it is two lines.</div>
  </div>
  <button id="close-button" slot="primaryButton" class="e-btn e-btn--primary e-btn--lg">Primary</button>
</elvia-modal>
`,
};

export { modalInfoCode };
