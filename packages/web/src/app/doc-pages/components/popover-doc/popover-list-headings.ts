const popoverListHeadingsCode = {
  type: 'list',
  codeReact: `{/* This example will only work once you have created a isShowing variable */}
<Popover
  type={"list"}
  verticalPosition={"bottom"}
  onOpen={() => isShowing = true}
  onClose={() => isShowing = false}
  trigger={
    <button className={'e-btn e-btn--icon e-btn--circled ' + (isShowing ? 'e-btn---selected' : '')} aria-label="More menu">
      <span className="e-btn__icon">
        <i className="e-icon e-icon--information_circle" aria-hidden="true"></i>
        <i className="e-icon e-icon e-icon--information_circle-filled-color" aria-hidden="true"></i>
      </span>
    </button>
  }
  content={
    <div className="ewc-popover__list">
      <div className="ewc-popover__list-group">
        <h1>Kundeforhold</h1>
        <button>
          <span>Be om tilgang</span>
        </button>
        <button>
          <span>Legg til bruker</span>
        </button>
      </div>
      <div className="ewc-popover__list-group">
        <h1>Innlogging</h1>
        <a>
          <span>Endre passord</span>
        </a>
        <a>
          <span>To-faktor autentisering</span>
        </a>
      </div>
    </div>
  }
></Popover>
`,
  codeAngular: `<!-- This example will only work once you have created a isShowing variable -->
<elvia-popover 
  [type]="'list'"
  [verticalPosition]="'bottom'"
  (onOpen)="isShowing = true"
  (onClose)="isShowing = false"
>
  <button slot="trigger" class="e-btn e-btn--icon e-btn--circled" [ngClass]="'e-btn---selected': isShowing" aria-label="More menu">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--information_circle" aria-hidden="true"></i>
      <i class="e-icon e-icon e-icon--information_circle-filled-color" aria-hidden="true"></i>
    </span>
  </button>
  <div slot="content" class="ewc-popover__list">
    <div class="ewc-popover__list-group">
      <h1>Kundeforhold</h1>
      <button>
        <span>Be om tilgang</span>
      </button>
      <button>
        <span>Legg til bruker</span>
      </button>
    </div>
    <div class="ewc-popover__list-group">
      <h1>Innlogging</h1>
      <a>
        <span>Endre passord</span>
      </a>
      <a>
        <span>To-faktor autentisering</span>
      </a>
    </div>
  </div>
</elvia-popover>
`,
  codeVue: `<!-- This example will only work once you have created a isShowing variable -->
<elvia-popover 
  :type="'list'"
  :verticalPosition="'bottom'"
  @on-open="isShowing = true"
  @on-close="isShowing = false"
>
  <button slot="trigger" class="e-btn e-btn--icon e-btn--circled" :class="[isActive ? isShowing : 'e-btn---selected']" aria-label="More menu">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--information_circle" aria-hidden="true"></i>
      <i class="e-icon e-icon e-icon--information_circle-filled-color" aria-hidden="true"></i>
    </span>
  </button>
  <div slot="content" class="ewc-popover__list">
    <div class="ewc-popover__list-group">
      <h1>Kundeforhold</h1>
      <button>
        <span>Be om tilgang</span>
      </button>
      <button>
        <span>Legg til bruker</span>
      </button>
    </div>
    <div class="ewc-popover__list-group">
      <h1>Innlogging</h1>
      <a>
        <span>Endre passord</span>
      </a>
      <a>
        <span>To-faktor autentisering</span>
      </a>
    </div>
  </div>
</elvia-popover>
`,
  codeNativeHTML: `<elvia-popover 
  id="example-elvia-popover-list-headings"
  type="list"
  verticalPosition="bottom"
>
  <button slot="trigger" class="e-btn e-btn--icon e-mr-8" aria-label="More menu" id="popover-trigger-button-headings">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--more_menu e-icon--inverted" aria-hidden="true"></i>
      <i class="e-icon e-icon--more_menu" aria-hidden="true"></i>
    </span>
  </button>
  <div slot="content" class="ewc-popover__list">
    <div class="ewc-popover__list-group">
      <h1>Kundeforhold</h1>
      <button>
        <span>Be om tilgang</span>
      </button>
      <button>
        <span>Legg til bruker</span>
      </button>
    </div>
    <div class="ewc-popover__list-group">
      <h1>Innlogging</h1>
      <a>
        <span>Endre passord</span>
      </a>
      <a>
        <span>To-faktor autentisering</span>
      </a>
    </div>
  </div>
</elvia-popover>
`,
  codeNativeScript: `  const popover = document.getElementById('example-elvia-popover-list-headings');
    const popoverTrigger = document.getElementById('popover-trigger-button-headings');
    popover.addEventListener('onOpen', () => {
      console.log('Do what you want when popover is opened.');
      popoverTrigger.classList.add('e-btn---selected');
    });
    popover.addEventListener('onClose', () => {
      console.log('Do what you want when popover is closed.');
      popoverTrigger.classList.remove('e-btn---selected');
    });
  `,
};

export { popoverListHeadingsCode };
