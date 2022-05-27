import ComponentTypeData from '../component-type-data.interface';

const cardSimpleCode: ComponentTypeData = {
  type: 'simple',
  codeReact: `<Card 
  header={"Safety"}
  icon={<i className="e-icon e-icon--electricity_safety e-icon--md" aria-hidden="true"></i>}
></Card>
`,
  codeAngular: `<elvia-card
  [header]="'Safety'"
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
  header="Safety"
>
  <i slot="icon" class="e-icon e-icon--electricity_safety e-icon--md" aria-hidden="true"></i>
</elvia-card>
`,
};

export { cardSimpleCode };
