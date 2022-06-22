import { exampleContents } from 'src/app/shared/example-contents';
import ComponentTypeData from '../component-type-data.interface';

const popoverInformativeCode: ComponentTypeData = {
  type: 'informative',
  attributes: {
    heading: {
      cegFormType: 'custom-text',
      cegCustomTextType: 'input',
      cegDefault: exampleContents.texts.md['eng-GBR'].title,
    },
    content: {
      cegFormType: 'custom-text',
      cegCustomTextType: 'textarea',
      cegDefault: exampleContents.texts.md['eng-GBR'].description,
    },
  },
  codeReact: `<Popover
  verticalPosition={"top"}
  onOpen={() => popoverOnOpen()}
  onClose={() => popoverOnClose()}
  trigger={
    <button className="e-btn e-btn--icon e-btn--circled" aria-label="Popover trigger">
      <span className="e-btn__icon">
        <i className="e-icon e-icon--information_circle" aria-hidden="true"></i>
        <i className="e-icon e-icon e-icon--information_circle-filled-color" aria-hidden="true"></i>
      </span>
    </button>
  }
></Popover>
`,
  codeAngular: `<elvia-popover 
  [verticalPosition]="'top'"
  (onOpen)="popoverOnOpen()"
  (onClose)="popoverOnClose()"
>
  <button slot="trigger" class="e-btn e-btn--icon e-btn--circled" aria-label="Popover trigger">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--information_circle" aria-hidden="true"></i>
      <i class="e-icon e-icon e-icon--information_circle-filled-color" aria-hidden="true"></i>
    </span>
  </button>
</elvia-popover>
`,
  codeVue: `<elvia-popover 
  :verticalPosition="'top'"
  @on-open="popoverOnOpen()"
  @on-close="popoverOnClose()"
>
  <button slot="trigger" class="e-btn e-btn--icon e-btn--circled" aria-label="Popover trigger">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--information_circle" aria-hidden="true"></i>
      <i class="e-icon e-icon e-icon--information_circle-filled-color" aria-hidden="true"></i>
    </span>
  </button>
</elvia-popover>
`,
  codeNativeHTML: `<elvia-popover 
  id="example-elvia-popover"
  verticalPosition="top"
>
  <button slot="trigger" class="e-btn e-btn--icon e-btn--circled" aria-label="Popover trigger">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--information_circle" aria-hidden="true"></i>
      <i class="e-icon e-icon e-icon--information_circle-filled-color" aria-hidden="true"></i>
    </span>
  </button>
</elvia-popover>
`,
};

export { popoverInformativeCode };
