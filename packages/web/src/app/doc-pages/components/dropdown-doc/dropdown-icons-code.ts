const dropdownIconsCode = {
  codeReact: `<Dropdown 
  options={[
    { value: 'renewableEnergy', label: 'Powerline', icon: 'powerline' },
    { value: 'checkCircle', label: 'Electricity tower', icon: 'electricityTower' },
    { value: 'Calendar', label: 'Cable', icon: 'cable' },
  ]} 
  defaultValue={{ value: 'checkCircle', label: 'Electricity tower', icon: 'electricityTower' }}
  label={"Label"}
  placeholder={"Placeholder"}
  valueOnChange={(event) => updateSelectedList(event)}
></Dropdown>
`,
  codeAngular: `<elvia-dropdown
  [options]="[
    { value: 'renewableEnergy', label: 'Powerline', icon: 'powerline' },
    { value: 'checkCircle', label: 'Electricity tower', icon: 'electricityTower' },
    { value: 'Calendar', label: 'Cable', icon: 'cable' },
  ]"
  [defaultValue]="{ value: 'checkCircle', label: 'Electricity tower', icon: 'electricityTower' }"
  [label]="'Label'"
  [placeholder]="'Placeholder'"
  (valueOnChange)="updateSelectedList($event.detail.value)"
></elvia-dropdown>
`,
  codeVue: `<elvia-dropdown
  :options="[
    { value: 'renewableEnergy', label: 'Powerline', icon: 'powerline' },
    { value: 'checkCircle', label: 'Electricity tower', icon: 'electricityTower' },
    { value: 'Calendar', label: 'Cable', icon: 'cable' },
  ]"
  :defaultValue="{ value: 'checkCircle', label: 'Electricity tower', icon: 'electricityTower' }"
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
    { value: 'renewableEnergy', label: 'Powerline', icon: 'powerline' },
    { value: 'checkCircle', label: 'Electricity tower', icon: 'electricityTower' },
    { value: 'Calendar', label: 'Cable', icon: 'cable' },
  ];
  dropdown.setProps({label: 'Label' });
  dropdown.setProps({placeholder: 'Placeholder' });
  dropdown.setProps({options: options});
  dropdown.setProps({defaultValue: options[1]});
  dropdown.addEventListener('valueOnChange', (event) => {
    console.log('Do what you want with selected elements: ', event.detail.value);
  });
`,
};

export { dropdownIconsCode };
