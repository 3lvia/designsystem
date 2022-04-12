const dropdownIconsCode = {
  codeReact: `<Dropdown 
  options={[
    { value: 'renewableEnergy', label: 'Renewable Energy', icon: 'renewableEnergy' },
    { value: 'checkCircle', label: 'Checkmark', icon: 'checkCircle' },
    { value: 'Calendar', label: 'Calendar', icon: 'calendar' },
  ]} 
  label={"Label"}
  placeholder={"Placeholder"}
  valueOnChange={(event) => updateSelectedList(event)}
></Dropdown>
`,
  codeAngular: `<elvia-dropdown
  [options]="[
    { value: 'renewableEnergy', label: 'Renewable Energy', icon: 'renewableEnergy' },
    { value: 'checkCircle', label: 'Checkmark', icon: 'checkCircle' },
    { value: 'Calendar', label: 'Calendar', icon: 'calendar' },
  ]"
  [label]="'Label'"
  [placeholder]="'Placeholder'"
  (valueOnChange)="updateSelectedList($event.detail.value)"
></elvia-dropdown>
`,
  codeVue: `<elvia-dropdown
  :options="[
    { value: 'renewableEnergy', label: 'Renewable Energy', icon: 'renewableEnergy' },
    { value: 'checkCircle', label: 'Checkmark', icon: 'checkCircle' },
    { value: 'Calendar', label: 'Calendar', icon: 'calendar' },
  ]"
  :label="'Label'"
  :placeholder="'Placeholder'"
  @value-on-change="updateSelectedList($event.detail.value)"
></elvia-dropdown>
`,
  codeNativeHTML: `<elvia-dropdown
  id="example-elvia-dropdown-icons"
></elvia-dropdown>`,

  codeNativeScript: `  const dropdown = document.getElementById('example-elvia-dropdown-icons');
  const options = [
    { value: 'renewableEnergy', label: 'Renewable Energy', icon: 'renewableEnergy' },
    { value: 'checkCircle', label: 'Checkmark', icon: 'checkCircle' },
    { value: 'Calendar', label: 'Calendar', icon: 'calendar' },
  ];
  dropdown.setProps({label: 'Label' });
  dropdown.setProps({placeholder: 'Placeholder' });
  dropdown.setProps({options: options});
  dropdown.addEventListener('valueOnChange', (event) => {
    console.log('Do what you want with selected elements: ', event.detail.value);
  });
`,
};

export { dropdownIconsCode };
