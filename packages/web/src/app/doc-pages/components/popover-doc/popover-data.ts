import { exampleContents } from 'src/app/shared/example-contents';
import changelogJson from 'src/assets/changelogs/elvis-popover/CHANGELOG.json';
import ComponentData from '../component-data.interface';

const popoverData: ComponentData = {
  name: 'elvis-popover',
  elementNameW: 'elvia-popover',
  elementNameR: 'Popover',
  attributes: {
    header: {
      isRequired: false,
      type: 'string',
      description: 'Header of content',
      cegDisplayName: 'Header',
      cegType: 'string',
      cegFormType: 'toggle',
      cegDefault: true,
      cegOption: exampleContents.texts.md['eng-GBR'].title,
    },
    hasCloseBtn: {
      isRequired: false,
      type: 'boolean',
      description: 'Determines if the close button in the upper right corner should be visible',
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
      description: 'Determines the popover is showing or not.',
      default: 'false',
    },
    isShowingOnChange: {
      isRequired: false,
      type: '(isShowing: boolean) => CustomEvent',
      description: 'Gets called every time the isShowing value is changed.',
    },
    content: {
      isRequired: true,
      type: 'string | HTMLElement',
      description: 'Text, images, tables or any other content (use slot in webcomponent if not just text)',
    },
    trigger: {
      isRequired: true,
      type: 'HTMLElement',
      description: 'The element the user clicks to open the popover',
    },
    posY: {
      isRequired: false,
      type: '“bottom” | “top”',
      description: 'Position vertically',
      default: '“top”',
      cegDisplayName: 'Vertical position',
      cegDefault: 'top',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['top', 'bottom'],
    },
    posX: {
      isRequired: false,
      type: '“left” | “center” | “right”',
      description: 'Position horizontally',
      default: '“center”',
      cegDisplayName: 'Horizontal position',
      cegDefault: 'center',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['left', 'center', 'right'],
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom css classes that can be added to the popover.',
    },
    inlineStyle: {
      isRequired: false,
      type: 'string',
      description: 'Custom css style that can be added to the popover.',
    },
  },
  package: 'npm install @elvia/elvis-popover',
  codeImportReact: `import { Popover } from '@elvia/elvis-popover/react';`,
  codeImportWebComponent: `import '@elvia/elvis-popover';`,
  codeReact:
    `<Popover
  header={"` +
    exampleContents.texts.md['eng-GBR'].title +
    `"}
  content={"` +
    exampleContents.texts.md['eng-GBR'].description +
    `"}
  posY={"top"}
  isShowingOnChange={(event) => showingChanges(event)}
  trigger={
    <button className="e-btn e-btn--icon e-btn--circled" aria-label="Åpne popover">
      <span className="e-btn__icon">
        <i className="e-icon e-icon--information_circle" aria-hidden="true"></i>
        <i className="e-icon e-icon e-icon--information_circle-filled-color" aria-hidden="true"></i>
      </span>
    </button>
  }
></Popover>
`,
  codeAngular:
    `<elvia-popover 
  [header]="'` +
    exampleContents.texts.md['eng-GBR'].title +
    `'"
  [content]="'` +
    exampleContents.texts.md['eng-GBR'].description +
    `'"
  [posY]="'top'"
  (isShowingOnChange)="showingChanges($event.detail.value)"
>
  <button slot="trigger" class="e-btn e-btn--icon e-btn--circled" aria-label="Åpne popover">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--information_circle" aria-hidden="true"></i>
      <i class="e-icon e-icon e-icon--information_circle-filled-color" aria-hidden="true"></i>
    </span>
  </button>
</elvia-popover>
`,
  codeVue:
    `<elvia-popover 
  :header="'` +
    exampleContents.texts.md['eng-GBR'].title +
    `'"
  :content="'` +
    exampleContents.texts.md['eng-GBR'].description +
    `'"
  :posY="'top'"
  @is-showing-on-change="showingChanges($event.detail.value)"
>
  <button slot="trigger" class="e-btn e-btn--icon e-btn--circled" aria-label="Åpne popover">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--information_circle" aria-hidden="true"></i>
      <i class="e-icon e-icon e-icon--information_circle-filled-color" aria-hidden="true"></i>
    </span>
  </button>
</elvia-popover>
`,
  codeNativeHTML:
    `<elvia-popover 
  id="example-elvia-popover"
  header="` +
    exampleContents.texts.md['eng-GBR'].title +
    `"
  posY="top"
>
  <button slot="trigger" class="e-btn e-btn--icon e-btn--circled" aria-label="Åpne popover">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--information_circle" aria-hidden="true"></i>
      <i class="e-icon e-icon e-icon--information_circle-filled-color" aria-hidden="true"></i>
    </span>
  </button>
</elvia-popover>
`,
  codeNativeScript: `  const popover = document.getElementById('example-elvia-popover');
  popover.setProps({content: ${JSON.stringify(exampleContents.texts.md['eng-GBR'].description)}});
  popover.addEventListener('isShowingOnChange', (event) => {
    console.log('Do what you want when visibility changes: ', event.detail.value);
  });
`,
  changelog: changelogJson.content,
};

export { popoverData };
