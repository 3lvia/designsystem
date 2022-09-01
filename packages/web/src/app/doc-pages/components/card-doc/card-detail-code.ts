import { exampleContents } from 'src/app/shared/example-contents';
import ComponentTypeData from '../component-type-data.interface';

const cardDetailCode: ComponentTypeData = {
  type: 'detail',
  attributes: {
    heading: {
      cegFormType: 'custom-text',
      cegCustomTextType: 'input',
      cegDefault: exampleContents.texts.lg['eng-GBR'].title,
    },
    description: {
      cegFormType: 'custom-text',
      cegCustomTextType: 'textarea',
      cegDefault: exampleContents.texts.lg['eng-GBR'].description,
    },
    tag: {
      cegFormType: 'custom-text',
      cegCustomTextType: 'input',
      cegDefault: '',
    },
  },
  codeReact: `<Card 
  type={"detail"}
></Card>
`,
  codeAngular: `<elvia-card
  [type]="'detail'"
></elvia-card>
`,
  codeVue: `<elvia-card 
  :type="'detail'"
></elvia-card>`,
  codeNativeHTML: `<elvia-card
  type="detail"
></elvia-card>
`,
};

export { cardDetailCode };
