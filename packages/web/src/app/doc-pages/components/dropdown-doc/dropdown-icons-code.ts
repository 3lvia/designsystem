const dropdownIconsCode = {
  codeReact: `<Dropdown 
  items={[
    { value: 'Powerline', label: 'Powerline', icon: 'powerline' },
    { value: 'Electricity tower', label: 'Electricity tower', icon: 'electricityTower' },
    { value: 'Cable', label: 'Cable', icon: 'cable' },
  ]} 
  value="Electricity tower"
  label="Label"
  placeholder="Placeholder"
  valueOnChange={(event) => updateSelectedList(event)}
></Dropdown>
`,
  codeAngular: `<elvia-dropdown
  [items]="[
    { value: 'Powerline', label: 'Powerline', icon: 'powerline' },
    { value: 'Electricity tower', label: 'Electricity tower', icon: 'electricityTower' },
    { value: 'Cable', label: 'Cable', icon: 'cable' },
  ]"
  value="Electricity tower"
  label="Label"
  placeholder="Placeholder"
  (valueOnChange)="updateSelectedList($event.detail.value)"
></elvia-dropdown>
`,
  codeVue: `<elvia-dropdown
  :items="[
    { value: 'Powerline', label: 'Powerline', icon: 'powerline' },
    { value: 'Electricity tower', label: 'Electricity tower', icon: 'electricityTower' },
    { value: 'Cable', label: 'Cable', icon: 'cable' },
  ]"
  value="Electricity tower"
  label="Label"
  placeholder="Placeholder"
  @value-on-change="updateSelectedList($event.detail.value)"
></elvia-dropdown>
`,
  codeNativeHTML: `<elvia-dropdown
  id="example-elvia-dropdown-icons"
></elvia-dropdown>`,

  codeNativeScript: `  const dropdown = document.getElementById('example-elvia-dropdown-icons');
  const items = [
    { value: 'Powerline', label: 'Powerline', icon: 'powerline' },
    { value: 'Electricity tower', label: 'Electricity tower', icon: 'electricityTower' },
    { value: 'Cable', label: 'Cable', icon: 'cable' },
  ];
  dropdown.setProps({label: 'Label'});
  dropdown.setProps({placeholder: 'Placeholder' });
  dropdown.setProps({items: items});
  dropdown.setProps({value: items[1].value});
  dropdown.addEventListener('valueOnChange', (event) => {
    console.log('Do what you want with selected elements: ', event.detail.value);
  });
`,
};

export { dropdownIconsCode };
