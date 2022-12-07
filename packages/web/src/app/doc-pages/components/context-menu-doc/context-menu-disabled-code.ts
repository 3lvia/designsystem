const contextMenuDisabledCode = {
  codeReact: `<ContextMenu
    onOpen={() => setIsShowing(true)}
    onClose={() => setIsShowing(false)}
    trigger={
      <button aria-haspopup="menu" className={'e-btn e-btn--icon e-btn--circled ' + (isShowing ? 'e-btn---selected' : '')}>
        <span className="e-btn__icon">
        <i class="e-icon e-icon--more_menu e-icon--inverted" aria-hidden="true"></i>
        <i class="e-icon e-icon--more_menu" aria-hidden="true"></i>
        </span>
      </button>
    }
    content={
      <>
        <div className="ewc-context-menu__list-group">
          <button role="menuitem">
            <span>Be om tilgang</span>
          </button>
          <button role="menuitem" disabled>
            <span>Legg til bruker</span>
          </button>
        </div>
        <div className="ewc-context-menu__list-group">
          <a role="menuitem" href="#">
            <span>Endre passord</span>
          </a>
        </div>
      </>
    }
  ></ContextMenu>`,
  codeAngular: `<elvia-context-menu 
    (onOpen)="isShowing=true"
    (onClose)="isShowing=false"
  >
    <button aria-haspopup="menu" slot="trigger" class="e-btn e-btn--icon e-mr-8" [ngClass]="'e-btn---selected': isShowing" aria-label="More menu">
      <span class="e-btn__icon">
        <i class="e-icon e-icon--more_menu e-icon--inverted" aria-hidden="true"></i>
        <i class="e-icon e-icon--more_menu" aria-hidden="true"></i>
      </span>
    </button>
    <div slot="content">
      <div class="ewc-context-menu__list-group">
        <button role="menuitem">
          <span>Be om tilgang</span>
        </button>
        <button role="menuitem" [disabled]="true">
          <span>Legg til bruker</span>
        </button>
      </div>
      <div class="ewc-context-menu__list-group">
        <a role="menuitem" href="#">
          <span>Endre passord</span>
        </a>
      </div>
    </div>
  </elvia-context-menu>`,
  codeVue: `<elvia-context-menu 
    @on-open="isShowing=true"
    @on-close="isShowing=false"
  >
    <button aria-haspopup="menu" slot="trigger" class="e-btn e-btn--icon e-mr-8" :class="[isActive ? isShowing : 'e-btn---selected']" aria-label="More menu">
      <span class="e-btn__icon">
        <i class="e-icon e-icon--more_menu e-icon--inverted" aria-hidden="true"></i>
        <i class="e-icon e-icon--more_menu" aria-hidden="true"></i>
      </span>
    </button>
    <div slot="content">
      <div class="ewc-context-menu__list-group">
        <button role="menuitem">
          <span>Be om tilgang</span>
        </button>
        <button role="menuitem" disabled>
          <span>Legg til bruker</span>
        </button>
      </div>
      <div class="ewc-context-menu__list-group">
        <a role="menuitem" href="#">
          <span>Endre passord</span>
        </a>
      </div>
    </div>
  </elvia-context-menu>`,
  codeNativeHTML: `<elvia-context-menu 
    id="example-elvia-context-menu-disabled"
  >
    <button aria-haspopup="menu" slot="trigger" class="e-btn e-btn--icon e-mr-8" aria-label="More menu" id="context-menu-trigger-button">
      <span class="e-btn__icon">
        <i class="e-icon e-icon--more_menu e-icon--inverted" aria-hidden="true"></i>
        <i class="e-icon e-icon--more_menu" aria-hidden="true"></i>
      </span>
    </button>
    <div slot="content">
      <div class="ewc-context-menu__list-group">
        <button role="menuitem">
          <span>Be om tilgang</span>
        </button>
        <button role="menuitem" disabled>
          <span>Legg til bruker</span>
        </button>
      </div>
      <div class="ewc-context-menu__list-group">
        <a role="menuitem" href="#">
          <span>Endre passord</span>
        </a>
      </div>
    </div>
  </elvia-context-menu>`,
  codeNativeScript: `  const contextMenu = document.getElementById('example-elvia-context-menu-disabled');
    const contextMenuTrigger = document.getElementById('context-menu-trigger-button');
    contextMenu.addEventListener('onOpen', () => {
      console.log('Do what you want when context menu is opened.');
      contextMenuTrigger.classList.add('e-btn---selected');
    });
    contextMenu.addEventListener('onClose', () => {
      console.log('Do what you want when context menu is closed.');
      contextMenuTrigger.classList.remove('e-btn---selected');
    });
  `,
};

export { contextMenuDisabledCode };
