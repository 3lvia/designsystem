import { exampleContents } from 'src/app/shared/example-contents';

const cardDetailCode = {
  type: 'detail',
  codeReact:
    `<Card 
  type={"detail"}
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
</elvia-card>
`,
  codeNativeScript: `  const card = document.getElementById('example-elvia-card');
`,
};

export { cardDetailCode };
