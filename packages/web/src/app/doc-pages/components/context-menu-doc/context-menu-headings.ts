const contextMenuHeadingsCode = {
  codeReact: `{/* This example will only work once you have created a isShowing variable */}
<ContextMenu
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
    <div role="menu">
      <div className="ewc-popover__list-group">
        <h1>Kundeforhold</h1>
        <button role="menuitem">
          <span>Be om tilgang</span>
        </button>
        <button role="menuitem">
          <span>Legg til bruker</span>
        </button>
      </div>
      <div className="ewc-popover__list-group">
        <h1>Innlogging</h1>
        <a role="menuitem">
          <span>Endre passord</span>
        </a>
        <a role="menuitem">
          <span>To-faktor autentisering</span>
        </a>
      </div>
    </div>
  }
></ContextMenu>
`,
  codeAngular: `<!-- This example will only work once you have created a isShowing variable -->
<elvia-context-menu
  (onOpen)="isShowing = true"
  (onClose)="isShowing = false"
>
  <button aria-haspopup="menu" aria-haspopup="menu" slot="trigger" class="e-btn e-btn--icon e-btn--circled" [ngClass]="'e-btn---selected': isShowing" aria-label="More menu">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--information_circle" aria-hidden="true"></i>
      <i class="e-icon e-icon e-icon--information_circle-filled-color" aria-hidden="true"></i>
    </span>
  </button>
  <div slot="content" role="menu">
    <div class="ewc-context-menu__list-group">
      <h1>Kundeforhold</h1>
      <button role="menuitem">
        <span>Be om tilgang</span>
      </button>
      <button role="menuitem">
        <span>Legg til bruker</span>
      </button>
    </div>
    <div class="ewc-context-menu__list-group">
      <h1>Innlogging</h1>
      <a role="menuitem">
        <span>Endre passord</span>
      </a>
      <a role="menuitem">
        <span>To-faktor autentisering</span>
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
  <button aria-haspopup="menu" slot="trigger" class="e-btn e-btn--icon e-btn--circled" :class="[isActive ? isShowing : 'e-btn---selected']" aria-label="More menu">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--information_circle" aria-hidden="true"></i>
      <i class="e-icon e-icon e-icon--information_circle-filled-color" aria-hidden="true"></i>
    </span>
  </button>
  <div slot="content" role="menu">
    <div class="ewc-context-menu__list-group">
      <h1>Kundeforhold</h1>
      <button role="menuitem">
        <span>Be om tilgang</span>
      </button>
      <button role="menuitem">
        <span>Legg til bruker</span>
      </button>
    </div>
    <div class="ewc-context-menu__list-group">
      <h1>Innlogging</h1>
      <a role="menuitem">
        <span>Endre passord</span>
      </a>
      <a role="menuitem">
        <span>To-faktor autentisering</span>
      </a>
    </div>
  </div>
</elvia-context-menu>
`,
  codeNativeHTML: `<elvia-context-menu 
  id="example-elvia-context-menu-headings"
>
  <button aria-haspopup="menu" slot="trigger" class="e-btn e-btn--icon e-mr-8" aria-label="More menu" id="context-menu-trigger-headings">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--more_menu e-icon--inverted" aria-hidden="true"></i>
      <i class="e-icon e-icon--more_menu" aria-hidden="true"></i>
    </span>
  </button>
  <div slot="content" role="menu">
    <div class="ewc-context-menu__list-group">
      <h1>Kundeforhold</h1>
      <button role="menuitem">
        <span>Be om tilgang</span>
      </button>
      <button role="menuitem">
        <span>Legg til bruker</span>
      </button>
    </div>
    <div class="ewc-context-menu__list-group">
      <h1>Innlogging</h1>
      <a role="menuitem">
        <span>Endre passord</span>
      </a>
      <a role="menuitem">
        <span>To-faktor autentisering</span>
      </a>
    </div>
  </div>
</elvia-context-menu>
`,
  codeNativeScript: `const contextMenu = document.getElementById('example-elvia-context-menu-headings');
    const contextMenuTrigger = document.getElementById('context-menu-trigger-headings');
    contextMenu.addEventListener('onOpen', () => {
      console.log('Do what you want when context-menu is opened.');
      contextMenuTrigger.classList.add('e-btn---selected');
    });
    contextMenu.addEventListener('onClose', () => {
      console.log('Do what you want when context-menu is closed.');
      contextMenuTrigger.classList.remove('e-btn---selected');
    });
  `,
};

export { contextMenuHeadingsCode };
