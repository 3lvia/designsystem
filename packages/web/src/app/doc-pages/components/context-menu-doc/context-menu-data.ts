import changelogJson from 'src/assets/changelogs/elvis-context-menu/CHANGELOG.json';
import ComponentData from '../component-data.interface';

const contextMenuData: ComponentData = {
  changelog: changelogJson.content,
  name: 'elvis-context-menu',
  elementNameW: 'elvia-context-menu',
  elementNameR: 'ContextMenu',
  attributes: {
    content: {
      isRequired: true,
      type: 'string | HTMLElement | JSX.Element',
      description:
        'The content (use slot in webcomponent if not just text), typically a list of buttons and links.',
    },
    trigger: {
      isRequired: true,
      type: 'HTMLElement | JSX.Element',
      description: 'The element the user clicks to open the context menu.',
    },
    isShowing: {
      isRequired: false,
      type: 'boolean',
      description: 'Determines whether the context menu is showing or not.',
      default: 'false',
    },
    onOpen: {
      isRequired: false,
      type: '() => void',
      description: 'Callback for every time the context menu is being opened.',
    },
    onClose: {
      isRequired: false,
      type: '() => void',
      description: 'Callback for every time the context menu is being closed.',
    },
    verticalPosition: {
      isRequired: false,
      type: 'bottom | top',
      description: 'Position vertically.',
      default: 'bottom',
      cegDisplayName: 'Vertical position',
      cegDefault: 'bottom',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['top', 'bottom'],
    },
    horizontalPosition: {
      isRequired: false,
      type: 'left | right',
      description: 'Position horizontally.',
      default: 'left',
      cegDisplayName: 'Horizontal position',
      cegDefault: 'left',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['left', 'right'],
    },
    className: {
      isRequired: false,
      type: 'string',
      description:
        'Custom CSS classes that can be added to the context menu. Note: This applies to the content, not the trigger.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the context menu. Example: {marginTop: '8px', width: '100%'}. Note: This applies to the content, not the trigger.",
    },
  },
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
        <button role="menuitem">
          <span>Legg til bruker</span>
        </button>
      </div>
      <div className="ewc-context-menu__list-group">
        <a role="menuitem">
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
      <button role="menuitem">
        <span>Legg til bruker</span>
      </button>
    </div>
    <div class="ewc-context-menu__list-group">
      <a role="menuitem">
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
      <button role="menuitem">
        <span>Legg til bruker</span>
      </button>
    </div>
    <div class="ewc-context-menu__list-group">
      <a role="menuitem">
        <span>Endre passord</span>
      </a>
    </div>
  </div>
</elvia-context-menu>`,
  codeNativeHTML: `<elvia-context-menu 
  id="example-elvia-context-menu"
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
      <button role="menuitem">
        <span>Legg til bruker</span>
      </button>
    </div>
    <div class="ewc-context-menu__list-group">
      <a role="menuitem">
        <span>Endre passord</span>
      </a>
    </div>
  </div>
</elvia-context-menu>`,
  codeNativeScript: `  const contextMenu = document.getElementById('example-elvia-context-menu');
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

export { contextMenuData };
