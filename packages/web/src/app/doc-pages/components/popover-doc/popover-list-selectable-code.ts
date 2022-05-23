const popoverListSelectableCode = {
  type: 'list',
  codeReact: `<Popover
  type={"list"}
  selectable={true}
  verticalPosistion={"bottom"}
  onClose={(event) => showingChanges(event)}
  onOpen={(event) => showingChanges(event)}
  trigger={
    <button className="e-btn e-btn--icon e-btn--circled" aria-label="More menu">
      <span className="e-btn__icon">
        <i className="e-icon e-icon--information_circle" aria-hidden="true"></i>
        <i className="e-icon e-icon e-icon--information_circle-filled-color" aria-hidden="true"></i>
      </span>
    </button>
  }
	content={
    <div slot="content" className="ewc-popover__list">
      <div className="ewc-popover__list-group">
        <button>
          <elvia-icon name="checkBold" size="xs"></elvia-icon>
          <span>Dato - nyeste til eldste</span>
        </button>
        <button>
          <span>Dato - eldste til nyeste</span>
        </button>
        <button>
          <span>Relevans</span>
        </button>
      </div>
    </div>
	}
></Popover>
`,
  codeAngular: `<elvia-popover 
  [type]="'list'"
  [selectable]="true"
  [verticalPosistion]="'bottom'"
  (onClose)="showingChanges($event.detail.value)"
  (onOpen)="showingChanges($event.detail.value)"
>
  <button slot="trigger" class="e-btn e-btn--icon e-btn--circled" aria-label="More menu">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--information_circle" aria-hidden="true"></i>
      <i class="e-icon e-icon e-icon--information_circle-filled-color" aria-hidden="true"></i>
    </span>
  </button>
  <div slot="content" class="ewc-popover__list">
    <div class="ewc-popover__list-group">
      <button>
        <elvia-icon name="checkBold" size="xs"></elvia-icon>
        <span>Dato - nyeste til eldste</span>
      </button>
      <button>
        <span>Dato - eldste til nyeste</span>
      </button>
      <button>
        <span>Relevans</span>
      </button>
    </div>
  </div>
</elvia-popover>
`,
  codeVue: `<elvia-popover 
  :type="'list'"
  :selectable="true"
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
      <button>
        <elvia-icon name="checkBold" size="xs"></elvia-icon>
        <span>Dato - nyeste til eldste</span>
      </button>
      <button>
        <span>Dato - eldste til nyeste</span>
      </button>
      <button>
        <span>Relevans</span>
      </button>
    </div>
  </div>
</elvia-popover>
`,
  codeNativeHTML: `<elvia-popover 
  id="example-elvia-popover-list-selectable"
  type="list"
  selectable="true"
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
      <button>
        <elvia-icon name="checkBold" size="xs"></elvia-icon>
        <span>Dato - nyeste til eldste</span>
      </button>
      <button>
        <span>Dato - eldste til nyeste</span>
      </button>
      <button>
        <span>Relevans</span>
      </button>
    </div>
  </div>
</elvia-popover>
`,
  codeNativeScript: `  const popover = document.getElementById('example-elvia-popover-list-selectable');
  popover.addEventListener('onClose', (event) => {
    console.log('Do what you want when visibility changes: ', event.detail.value);
  });
  popover.addEventListener('onPopover', (event) => {
    console.log('Do what you want when visibility changes: ', event.detail.value);
  });
`,
};

export { popoverListSelectableCode };
