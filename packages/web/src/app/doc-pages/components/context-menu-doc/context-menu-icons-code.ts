const contextMenuIconsCode = {
  codeReact: `{/* This example will only work once you have created a isShowing variable */}
<Popover
  onOpen={() => setIsShowing(true)}
  onClose={() => setIsShowing(false)}
  trigger={
    <button className={'e-btn e-btn--icon e-btn--circled ' + (isShowing ? 'e-btn---selected' : '')} aria-label="More menu">
      <span className="e-btn__icon">
        <i className="e-icon e-icon--information_circle" aria-hidden="true"></i>
        <i className="e-icon e-icon e-icon--information_circle-filled-color" aria-hidden="true"></i>
      </span>
    </button>
  }
  content={
    <>
      <div className="ewc-context-menu__list-group">
        <button>
          <elvia-icon name="edit" size="xs"></elvia-icon>
          <span>Rediger</span>
        </button>
        <button>
          <elvia-icon name="bin" size="xs"></elvia-icon>
          <span>Slett</span>
        </button>
      </div>
      <div className="ewc-context-menu__list-group">
        <a>
          <elvia-icon name="download" size="xs"></elvia-icon>
          <span>Last ned</span>
        </a>
      </div>
    </>
  }
></Popover>
`,
  codeAngular: `<!-- This example will only work once you have created a isShowing variable -->
<elvia-context-menu
  (onOpen)="isShowing = true"
  (onClose)="isShowing = false"
>
  <button slot="trigger" class="e-btn e-btn--icon e-btn--circled" [ngClass]="'e-btn---selected': isShowing" aria-label="More menu">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--information_circle" aria-hidden="true"></i>
      <i class="e-icon e-icon e-icon--information_circle-filled-color" aria-hidden="true"></i>
    </span>
  </button>
  <div slot="content">
    <div class="ewc-context-menu__list-group">
      <button>
        <elvia-icon name="edit" size="xs"></elvia-icon>
        <span>Rediger</span>
      </button>
      <button>
        <elvia-icon name="bin" size="xs"></elvia-icon>
        <span>Slett</span>
      </button>
    </div>
    <div class="ewc-context-menu__list-group">
      <a>
        <elvia-icon name="download" size="xs"></elvia-icon>
        <span>Last ned</span>
      </a>
    </div>
  </div>
</elvia-context-menu>
`,
  codeVue: `<!-- This example will only work once you have created a isShowing variable -->
<elvia-context-menu
  @on-open="isShowing = true"
  @on-close="isShowing = false"
>
  <button slot="trigger" class="e-btn e-btn--icon e-btn--circled" :class="[isActive ? isShowing : 'e-btn---selected']" aria-label="More menu">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--information_circle" aria-hidden="true"></i>
      <i class="e-icon e-icon e-icon--information_circle-filled-color" aria-hidden="true"></i>
    </span>
  </button>

  <div slot="content">
    <div class="ewc-context-menu__list-group">
      <button>
        <elvia-icon name="edit" size="xs"></elvia-icon>
        <span>Rediger</span>
      </button>
      <button>
        <elvia-icon name="bin" size="xs"></elvia-icon>
        <span>Slett</span>
      </button>
    </div>
    <div class="ewc-context-menu__list-group">
      <a>
        <elvia-icon name="download" size="xs"></elvia-icon>
        <span>Last ned</span>
      </a>
    </div>
  </div>
</elvia-context-menu>
`,
  codeNativeHTML: `<elvia-context-menu 
  id="example-elvia-context-menu-icons"
>
  <button slot="trigger" class="e-btn e-btn--icon e-mr-8" aria-label="More menu" id="context-menu-trigger-icons">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--more_menu e-icon--inverted" aria-hidden="true"></i>
      <i class="e-icon e-icon--more_menu" aria-hidden="true"></i>
    </span>
  </button>
  <div slot="content">
    <div class="ewc-context-menu__list-group">
      <button>
        <elvia-icon name="edit" size="xs"></elvia-icon>
        <span>Rediger</span>
      </button>
      <button>
        <elvia-icon name="bin" size="xs"></elvia-icon>
        <span>Slett</span>
      </button>
    </div>
    <div class="ewc-context-menu__list-group">
      <a>
        <elvia-icon name="download" size="xs"></elvia-icon>
        <span>Last ned</span>
      </a>
    </div>
  </div>
</elvia-context-menu>
`,
  codeNativeScript: `  const popover = document.getElementById('example-elvia-context-menu-icons');
  const popoverTrigger = document.getElementById('context-menu-trigger-icons');
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

export { contextMenuIconsCode };
