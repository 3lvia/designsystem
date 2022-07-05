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
  codeReact: `{/* This example will only work once you have created a isShowing variable */}
<Popover
  verticalPosition={"top"}
  onOpen={() => setIsShowing(true)}
  onClose={() => setIsShowing(false)}
  trigger={
    <button className={'e-btn e-btn--icon e-btn--circled ' + (isShowing ? 'e-btn---selected' : '')} aria-label="Popover trigger">
      <span className="e-btn__icon">
        <i className="e-icon e-icon--information_circle" aria-hidden="true"></i>
        <i className="e-icon e-icon e-icon--information_circle-filled-color" aria-hidden="true"></i>
      </span>
    </button>
  }
></Popover>
`,
  codeAngular: `<!-- This example will only work once you have created a isShowing variable -->
<elvia-popover 
  [verticalPosition]="'top'"
  (onOpen)="setIsShowing = true"
  (onClose)="setIsShowing = false"
>
  <button slot="trigger" class="e-btn e-btn--icon e-btn--circled" [ngClass]="'e-btn---selected': isShowing" aria-label="Popover trigger">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--information_circle" aria-hidden="true"></i>
      <i class="e-icon e-icon e-icon--information_circle-filled-color" aria-hidden="true"></i>
    </span>
  </button>
</elvia-popover>
`,
  codeVue: `<!-- This example will only work once you have created a isShowing variable -->
<elvia-popover 
  :verticalPosition="'top'"
  @on-open="isShowing = true"
  @on-close="isShowing = false"
>
  <button slot="trigger" class="e-btn e-btn--icon e-btn--circled" :class="[isActive ? isShowing : 'e-btn---selected']" aria-label="Popover trigger">
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
  isShowing="false"
>
  <button slot="trigger" class="e-btn e-btn--icon e-btn--circled" aria-label="Popover trigger" id="popover-trigger-button">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--information_circle" aria-hidden="true"></i>
      <i class="e-icon e-icon e-icon--information_circle-filled-color" aria-hidden="true"></i>
    </span>
  </button>
</elvia-popover>
`,
};

export { popoverInformativeCode };
