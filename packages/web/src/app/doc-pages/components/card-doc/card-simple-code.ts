const cardSimpleCode = {
  type: 'simple',
  codeReact: `<Card 
  header={"Safety"}
  icon={<i className="e-icon e-icon--electricity_safety e-icon--md"></i>}
></Card>
`,
  codeAngular: `<elvia-card
  [header]="'Safety'"
>
  <i slot="icon" class="e-icon e-icon--electricity_safety e-icon--md"></i>
</elvia-card>
`,
  codeVue: `<elvia-card 
  :header="'Safety'" 
>
  <i slot="icon" class="e-icon e-icon--electricity_safety e-icon--md"></i>
</elvia-card>`,
  codeNativeHTML: `<elvia-card
  header="Safety"
>
  <i slot="icon" class="e-icon e-icon--electricity_safety e-icon--md"></i>
</elvia-card>
`,
  codeNativeScript: `  const card = document.getElementById('example-elvia-card');
`,
};

export { cardSimpleCode };
