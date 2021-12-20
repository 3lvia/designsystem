const cardSimpleCode = {
  type: 'simple',
  codeReact: `<Card 
  icon={<i class="e-icon e-icon--electricity_safety e-icon--md"></i>}
  header={"Safety"}
  description={"Electricity information"}
></Card>
`,
  codeAngular: `<elvia-card
  [header]="'Safety'"
  [description]="'Electricity information'"
>
  <i slot="icon" class="e-icon e-icon--electricity_safety e-icon--md"></i>
</elvia-card>
`,
  codeVue: `<elvia-card 
  :header="'Safety'" 
  :description="'Electricity information'"
>
  <i slot="icon" class="e-icon e-icon--electricity_safety e-icon--md"></i>
</elvia-card>`,
  codeNativeHTML: `<elvia-card
  header="Safety"
  description="Electricity information"
>
  <i slot="icon" class="e-icon e-icon--electricity_safety e-icon--md"></i>
</elvia-card>
`,
  codeNativeScript: `  const card = document.getElementById('example-elvia-card');
`,
};

export { cardSimpleCode };
