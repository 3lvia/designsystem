import ComponentTypeData from '../component-type-data.interface';

const cardSimpleCode: ComponentTypeData = {
  type: 'simple',
  attributes: {
    header: {
      cegFormType: 'custom-text',
      cegCustomTextType: 'input',
      cegDefault: 'Safety',
      cegType: 'string',
    },
    description: {
      cegFormType: 'custom-text',
      cegCustomTextType: 'textarea',
      cegDefault: '',
      cegType: 'string',
    },
  },
  codeReact: `<Card 
  icon={<i className="e-icon e-icon--electricity_safety e-icon--md" aria-hidden="true"></i>}
></Card>
`,
  codeAngular: `<elvia-card
>
  <i slot="icon" class="e-icon e-icon--electricity_safety e-icon--md" aria-hidden="true"></i>
</elvia-card>
`,
  codeVue: `<elvia-card 
  :header="'Safety'" 
>
  <i slot="icon" class="e-icon e-icon--electricity_safety e-icon--md" aria-hidden="true"></i>
</elvia-card>`,
  codeNativeHTML: `<elvia-card
>
  <i slot="icon" class="e-icon e-icon--electricity_safety e-icon--md" aria-hidden="true"></i>
</elvia-card>
`,
};

export { cardSimpleCode };
