const contextMenuSelectableCode = {
  codeReact: `{/* This example will only work once you have created a isShowing variable */}
<ContextMenu
  isSelectable={true}
  onOpen={() => setIsShowing(true)}
  onClose={() => setIsShowing(false)}
  trigger={
    <button aria-haspopup="menu" className={'e-btn e-btn--icon e-btn--circled ' + (isShowing ? 'e-btn---selected' : '')} aria-label="More menu">
      <span className="e-btn__icon">
        <i className="e-icon e-icon--information_circle" aria-hidden="true"></i>
        <i className="e-icon e-icon e-icon--information_circle-filled-color" aria-hidden="true"></i>
      </span>
    </button>
  }
	content={
    <div role="menu">
      <div className="ewc-context-menu__list-group">
        <button role="menuitem">
          <elvia-icon name="checkBold" size="xs"></elvia-icon>
          <span>Dato - nyeste til eldste</span>
        </button>
        <button role="menuitem">
          <span>Dato - eldste til nyeste</span>
        </button>
        <button role="menuitem">
          <span>Relevans</span>
        </button>
      </div>
    </div>
	}
></ContextMenu>
`,
  codeAngular: `<!-- This example will only work once you have created a isShowing variable -->
<elvia-context-menu 
  isSelectable="true"
  (onOpen)="isShowing = true"
  (onClose)="isShowing = false"
>
  <button aria-haspopup="menu" slot="trigger" class="e-btn e-btn--icon e-btn--circled" [ngClass]="'e-btn---selected': isShowing" aria-label="More menu">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--information_circle" aria-hidden="true"></i>
      <i class="e-icon e-icon e-icon--information_circle-filled-color" aria-hidden="true"></i>
    </span>
  </button>
  <div slot="content" role="menu">
    <div class="ewc-context-menu__list-group">
      <button role="menuitem">
        <elvia-icon name="checkBold" size="xs"></elvia-icon>
        <span>Dato - nyeste til eldste</span>
      </button>
      <button role="menuitem">
        <span>Dato - eldste til nyeste</span>
      </button>
      <button role="menuitem">
        <span>Relevans</span>
      </button>
    </div>
  </div>
</elvia-context-menu>
`,
  codeVue: `<!-- This example will only work once you have created a isShowing variable -->
<elvia-context-menu 
  isSelectable="true"
  @on-open="isShowing = true"
  @on-close="isShowing = false"
>
  <button aria-haspopup="menu" slot="trigger" class="e-btn e-btn--icon e-btn--circled" :class="[isActive ? isShowing : 'e-btn---selected']" aria-label="More menu">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--information_circle" aria-hidden="true"></i>
      <i class="e-icon e-icon e-icon--information_circle-filled-color" aria-hidden="true"></i>
    </span>
  </button>
  <div slot="content" role="menu">
    <div class="ewc-context-menu__list-group">
      <button role="menuitem">
        <elvia-icon name="checkBold" size="xs"></elvia-icon>
        <span>Dato - nyeste til eldste</span>
      </button>
      <button role="menuitem">
        <span>Dato - eldste til nyeste</span>
      </button>
      <button role="menuitem">
        <span>Relevans</span>
      </button>
    </div>
  </div>
</elvia-context-menu>
`,
  codeNativeHTML: `<elvia-context-menu 
  id="example-elvia-context-menu-selectable"
  isSelectable="true"
>
  <button aria-haspopup="menu" slot="trigger" class="e-btn e-btn--icon e-mr-8" aria-label="More menu" id="context-menu-trigger-selectable">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--more_menu e-icon--inverted" aria-hidden="true"></i>
      <i class="e-icon e-icon--more_menu" aria-hidden="true"></i>
    </span>
  </button>
  <div slot="content" role="menu">
    <div class="ewc-context-menu__list-group">
      <button role="menuitem">
        <elvia-icon name="checkBold" size="xs"></elvia-icon>
        <span>Dato - nyeste til eldste</span>
      </button>
      <button role="menuitem">
        <span>Dato - eldste til nyeste</span>
      </button>
      <button role="menuitem">
        <span>Relevans</span>
      </button>
    </div>
  </div>
</elvia-context-menu>
`,
  codeNativeScript: `  const popover = document.getElementById('example-elvia-context-menu-selectable');
  const popoverTrigger = document.getElementById('context-menu-trigger-selectable');
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

export { contextMenuSelectableCode };
