const popoverListHeadingsCode = {
  type: 'list',
  codeReact: `<Popover
  type={"list"}
  verticalPosistion={"bottom"}
  isShowingOnChange={(event) => showingChanges(event)}
  trigger={
    <button className="e-btn e-btn--icon e-btn--circled" aria-label="More menu">
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
  codeAngular: `<elvia-popover 
  [type]="'list'"
  [verticalPosistion]="'bottom'"
  (isShowingOnChange)="showingChanges($event.detail.value)"
>
  <button slot="trigger" class="e-btn e-btn--icon e-btn--circled" aria-label="More menu">
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
  codeVue: `<elvia-popover 
  :type="'list'"
  :verticalPosistion="'bottom'"
  @is-showing-on-change="showingChanges($event.detail.value)"
>
  <button slot="trigger" class="e-btn e-btn--icon e-btn--circled" aria-label="More menu">
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
  verticalPosistion="bottom"
>
  <button slot="trigger" class="e-btn e-btn--icon e-mr-8" aria-label="More menu">
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
    popover.addEventListener('isShowingOnChange', (event) => {
      console.log('Do what you want when visibility changes: ', event.detail.value);
    });
  `,
};

export { popoverListHeadingsCode };
