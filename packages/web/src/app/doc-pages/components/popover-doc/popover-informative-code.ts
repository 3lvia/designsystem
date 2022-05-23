import { exampleContents } from 'src/app/shared/example-contents';

const popoverInformativeCode = {
  type: 'informative',
  codeReact:
    `<Popover
  heading={"` +
    exampleContents.texts.md['eng-GBR'].title +
    `"}
  content={"` +
    exampleContents.texts.md['eng-GBR'].description +
    `"}
    verticalPosition={"top"}
  onOpen={(event) => showingChanges(event)}
  onClose={(event) => showingChanges(event)}
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
  [heading]="'` +
    exampleContents.texts.md['eng-GBR'].title +
    `'"
  [content]="'` +
    exampleContents.texts.md['eng-GBR'].description +
    `'"
  [verticalPosition]="'top'"
  (onOpen)="showingChanges($event.detail.value)"
  (onClose)="showingChanges($event.detail.value)"
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
  :heading="'` +
    exampleContents.texts.md['eng-GBR'].title +
    `'"
  :content="'` +
    exampleContents.texts.md['eng-GBR'].description +
    `'"
  :verticalPosition="'top'"
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
  heading="` +
    exampleContents.texts.md['eng-GBR'].title +
    `"
  content=${JSON.stringify(exampleContents.texts.md['eng-GBR'].description)}
  verticalPosition="top"
>
  <button slot="trigger" class="e-btn e-btn--icon e-btn--circled" aria-label="Popover trigger">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--information_circle" aria-hidden="true"></i>
      <i class="e-icon e-icon e-icon--information_circle-filled-color" aria-hidden="true"></i>
    </span>
  </button>
</elvia-popover>
`,
  // all scripts for the examples are in popover-data.ts
};

export { popoverInformativeCode };
