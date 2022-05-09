import { exampleContents } from 'src/app/shared/example-contents';

const popoverInformativeCode = {
  type: 'informative',
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
    <button className="e-btn e-btn--icon e-btn--circled" aria-label="Popover trigger">
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
  <button slot="trigger" class="e-btn e-btn--icon e-btn--circled" aria-label="Popover trigger">
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
  <button slot="trigger" class="e-btn e-btn--icon e-btn--circled" aria-label="Popover trigger">
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
  <button slot="trigger" class="e-btn e-btn--icon e-btn--circled" aria-label="Popover trigger">
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
  // all scripts for the examples are in popover-data.ts
};

export { popoverInformativeCode };
