const popoverListCode = {
  type: 'list',
  codeReact: `<Popover
  type={"list"}
  verticalPosition={"top"}
  horizontalPosition={"center"}
  onOpen={(event) => showingChanges(event)}
  onClose={(event) => showingChanges(event)}
  trigger={
    <button className="e-btn e-btn--icon e-btn--circled">
      <span className="e-btn__icon">
        <i className="e-icon e-icon--information_circle"></i>
        <i className="e-icon e-icon e-icon--information_circle-filled-color"></i>
      </span>
    </button>
  }
  content={
    <div className="ewc-popover__list">
      <div className="ewc-popover__list-group">
        <button>
          <span>Be om tilgang</span>
        </button>
        <button>
          <span>Legg til bruker</span>
        </button>
      </div>
      <div className="ewc-popover__list-group">
        <a>
          <span>Endre passord</span>
        </a>
      </div>
    </div>
  }
></Popover>
`,
  codeAngular: `<elvia-popover 
  [type]="'list'"
  [verticalPosition]="'top'"
  [horizontalPosition]="'center'"
  (onOpen)="showingChanges($event.detail.value)"
  (onClose)="showingChanges($event.detail.value)"
>
  <button slot="trigger" class="e-btn e-btn--icon e-mr-8" aria-label="More menu">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--more_menu e-icon--inverted" aria-hidden="true"></i>
      <i class="e-icon e-icon--more_menu" aria-hidden="true"></i>
    </span>
  </button>
  <div slot="content" class="ewc-popover__list">
    <div class="ewc-popover__list-group">
      <button>
        <span>Be om tilgang</span>
      </button>
      <button>
        <span>Legg til bruker</span>
      </button>
    </div>
    <div class="ewc-popover__list-group">
      <a>
        <span>Endre passord</span>
      </a>
    </div>
  </div>
</elvia-popover>
`,
  codeVue: `<elvia-popover 
  :type="'list'"
  :verticalPosition="'top'"
  :horizontalPosition="'center'"
  @is-showing-on-change="showingChanges($event.detail.value)"
>
  <button slot="trigger" class="e-btn e-btn--icon e-mr-8" aria-label="More menu">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--more_menu e-icon--inverted" aria-hidden="true"></i>
      <i class="e-icon e-icon--more_menu" aria-hidden="true"></i>
    </span>
  </button>
  <div slot="content" class="ewc-popover__list">
    <div class="ewc-popover__list-group">
      <button>
        <span>Be om tilgang</span>
      </button>
      <button>
        <span>Legg til bruker</span>
      </button>
    </div>
    <div class="ewc-popover__list-group">
      <a>
        <span>Endre passord</span>
      </a>
    </div>
  </div>
</elvia-popover>
`,
  codeNativeHTML: `<elvia-popover 
  id="example-elvia-popover-list"
  type="list"
  verticalPosition="top"
  horizontalPosition="center"
>
  <button slot="trigger" class="e-btn e-btn--icon e-mr-8" aria-label="More menu">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--more_menu e-icon--inverted" aria-hidden="true"></i>
      <i class="e-icon e-icon--more_menu" aria-hidden="true"></i>
    </span>
  </button>
  <div slot="content" class="ewc-popover__list">
    <div class="ewc-popover__list-group">
      <button>
        <span>Be om tilgang</span>
      </button>
      <button>
        <span>Legg til bruker</span>
      </button>
    </div>
    <div class="ewc-popover__list-group">
      <a>
        <span>Endre passord</span>
      </a>
    </div>
  </div>
</elvia-popover>
`,
};

export { popoverListCode };
