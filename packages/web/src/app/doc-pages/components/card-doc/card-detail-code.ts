import { exampleContents } from 'src/app/shared/example-contents';

const cardDetailCode = {
  type: 'detail',
  codeReact:
    `<Card 
  type={"detail"}
  icon={<i class="e-icon e-icon--electricity_safety e-icon--md"></i>}
  header={"` +
    exampleContents.texts.lg['eng-GBR'].title +
    `"}
  description={"` +
    exampleContents.texts.lg['eng-GBR'].description +
    `"}
></Card>
`,
  codeAngular:
    `<elvia-card
  [type]="'detail'"
  [header]="'` +
    exampleContents.texts.lg['eng-GBR'].title +
    `'"
  [description]="'` +
    exampleContents.texts.lg['eng-GBR'].description +
    `'"
>
  <i slot="icon" class="e-icon e-icon--electricity_safety e-icon--md"></i>
</elvia-card>
`,
  codeVue:
    `<elvia-card 
  :type="'detail'"
  :header="'` +
    exampleContents.texts.lg['eng-GBR'].title +
    `'" 
  :description="'` +
    exampleContents.texts.lg['eng-GBR'].description +
    `'"
>
  <i slot="icon" class="e-icon e-icon--electricity_safety e-icon--md"></i>
</elvia-card>`,
  codeNativeHTML:
    `<elvia-card
  type="detail"
  header="` +
    exampleContents.texts.lg['eng-GBR'].title +
    `"
  description="` +
    exampleContents.texts.lg['eng-GBR'].description +
    `"
>
  <i slot="icon" class="e-icon e-icon--electricity_safety e-icon--md"></i>
</elvia-card>
`,
  codeNativeScript: `  const card = document.getElementById('example-elvia-card');
`,
};

export { cardDetailCode };
