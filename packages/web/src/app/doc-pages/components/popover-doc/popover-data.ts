import { exampleContents } from 'src/app/shared/example-contents';
import changelogJson from 'src/assets/changelogs/elvis-popover/CHANGELOG.json';
import ComponentData from '../component-data.interface';

const popoverData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Popover',
  attributes: {
    content: {
      isRequired: true,
      type: 'string | HTMLElement | JSX.Element',
      description: 'Text, images, tables or any other content (use slot in webcomponent if not just text).',
    },
    trigger: {
      isRequired: true,
      type: 'HTMLElement | JSX.Element',
      description: 'The element the user clicks to open the popover.',
    },
    heading: {
      isRequired: false,
      type: 'string',
      description: 'Heading of content.',
      cegDisplayName: 'Heading',
      cegType: 'string',
      cegFormType: 'toggle',
      cegDefault: true,
      cegOption: exampleContents.texts.md['eng-GBR'].title,
    },
    hasCloseButton: {
      isRequired: false,
      type: 'boolean',
      description: 'Determines if the close button in the upper right corner should be visible.',
      default: 'true',
      cegDisplayName: 'Close button',
      cegType: 'boolean',
      cegFormType: 'toggle',
      cegDefault: true,
      cegOption: 'false',
    },
    isShowing: {
      isRequired: false,
      type: 'boolean',
      description: 'Determines if the popover is visible.',
      default: 'false',
    },
    onOpen: {
      isRequired: false,
      type: '() => void',
      description: 'Callback for every time the popover is being opened.',
    },
    onClose: {
      isRequired: false,
      type: '() => void',
      description: 'Callback for every time the popover is being closed.',
    },
    verticalPosition: {
      isRequired: false,
      type: 'bottom | top',
      description: 'Position vertically.',
      default: 'top',
      cegDisplayName: 'Vertical position',
      cegDefault: 'top',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['top', 'bottom'],
    },
    horizontalPosition: {
      isRequired: false,
      type: 'left | center | right',
      description: 'Position horizontally.',
      default: 'center',
      cegDisplayName: 'Horizontal position',
      cegDefault: 'center',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['left', 'center', 'right'],
    },
    className: {
      isRequired: false,
      type: 'string',
      description:
        'Custom CSS classes that can be added to the popover. Note: This applies to the content, not the trigger.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the popover. Example: {marginTop: '8px', width: '100%'}. Note: This applies to the content, not the trigger.",
    },
  },
  codeReact: `<Popover
  heading="BankID"
  trigger={
    <button className={'e-btn e-btn--icon e-btn--circled ' + (isShowing ? 'e-btn---selected' : '')} aria-label="Popover trigger">
      <span className="e-btn__icon">
        <i className="e-icon e-icon--information_circle" aria-hidden="true"></i>
        <i className="e-icon e-icon e-icon--information_circle-filled-color" aria-hidden="true"></i>
      </span>
    </button>
  }
  content={
    <>
      <p class="e-text-md e-my-16">Alle privatkunder må bruke BankID første gang.</p>
      <button class="e-btn" onClick={() => setIsPopoverShowing(!isPopoverShowing)}>Lukke popover</button>
    </>
  }
></Popover>`,
  codeAngular: `<elvia-popover 
  heading="BankID"
>
  <button slot="trigger" class="e-btn e-btn--icon e-btn--circled" [ngClass]="'e-btn---selected': isShowing" aria-label="Popover trigger">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--information_circle" aria-hidden="true"></i>
      <i class="e-icon e-icon e-icon--information_circle-filled-color" aria-hidden="true"></i>
    </span>
  </button>

  <div slot="content">
    <p class="e-text-md e-my-16">Alle privatkunder må bruke BankID første gang.</p>
    <button class="e-btn" (click)="isPopoverShowing = !isPopoverShowing">Lukke popover</button>
  </div>
</elvia-popover>`,
  codeVue: `<elvia-popover 
  heading="BankID"
>
  <button slot="trigger" class="e-btn e-btn--icon e-btn--circled" :class="[isActive ? isShowing : 'e-btn---selected']" aria-label="Popover trigger">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--information_circle" aria-hidden="true"></i>
      <i class="e-icon e-icon e-icon--information_circle-filled-color" aria-hidden="true"></i>
    </span>
  </button>

  <div slot="content">
    <p class="e-text-md e-my-16">Alle privatkunder må bruke BankID første gang.</p>
    <button class="e-btn" @click="isPopoverShowing = !isPopoverShowing">Lukke popover</button>
  </div>
</elvia-popover>`,
  codeNativeHTML: `<elvia-popover 
  id="example-elvia-popover"
  heading="BankID"
  isShowing="false"
>
  <button slot="trigger" class="e-btn e-btn--icon e-btn--circled" aria-label="Popover trigger" id="popover-trigger-button">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--information_circle" aria-hidden="true"></i>
      <i class="e-icon e-icon e-icon--information_circle-filled-color" aria-hidden="true"></i>
    </span>
  </button>

  <div slot="content">
    <p class="e-text-md e-my-16">Alle privatkunder må bruke BankID første gang.</p>
    <button class="e-btn" id="popover-close-btn">Lukke popover</button>
  </div>
</elvia-popover>`,
  codeNativeScript: `  const popover = document.getElementById('example-elvia-popover');
  const popoverTrigger = document.getElementById('popover-trigger-button');
  popover.addEventListener('onOpen', () => {
    popover.setProps({isShowing: true});
    console.log('Do what you want when popover is opened.');
    popoverTrigger.classList.add('e-btn---selected');

    const closeBtn = document.getElementById('popover-close-btn');
    closeBtn.addEventListener('click', () => {
      popover.setProps({isShowing: false});
    });
  });
  popover.addEventListener('onClose', () => {
    console.log('Do what you want when popover is closed.');
    popoverTrigger.classList.remove('e-btn---selected');
  });
`,
};

export { popoverData };
