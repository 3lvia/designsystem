import { exampleContents } from 'src/app/shared/example-contents';
import ComponentTypeData from '../component-type-data.interface';

const cardDetailCode: ComponentTypeData = {
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
};

export { cardDetailCode };
