import ComponentTypeData from '../component-type-data.interface';

const cardDetailCode: ComponentTypeData = {
  type: 'detail',
  attributes: {
    heading: {
      cegFormType: 'custom-text',
      cegCustomTextType: 'input',
      cegDefault: 'Detail card title',
    },
    description: {
      cegFormType: 'custom-text',
      cegCustomTextType: 'textarea',
      cegDefault:
        'Choose the detail card when you need to provide more information to the users about the link. The summary text truncates automatically when it is too long, so keep it brief and to the point!',
    },
    tag: {
      cegFormType: 'custom-text',
      cegCustomTextType: 'input',
      cegDefault: 'Tag',
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
