const dropdownStatusCode = {
  codeReact: `<Dropdown 
    items={[
      { value: 'Norge', label: 'Norge', status: 'info' },
      { value: 'Sverige', label: 'Sverige', status: 'warning' },
      { value: 'Danmark', label: 'Danmark'},
      { value: 'Finland', label: 'Finland', status: 'error' },
    ]} 
    value={{ value: 'Electricity tower', label: 'Electricity tower' }}
    label={"Label"}
    placeholder={"Placeholder"}
    valueOnChange={(event) => updateSelectedList(event)}
  ></Dropdown>
  `,
  codeAngular: `<elvia-dropdown
    [items]="[
      { value: 'Norge', label: 'Norge', status: 'info' },
      { value: 'Sverige', label: 'Sverige', status: 'warning' },
      { value: 'Danmark', label: 'Danmark'},
      { value: 'Finland', label: 'Finland', status: 'error' },
    ]"
    [value]="{ value: 'Electricity tower', label: 'Electricity tower' }"
    [label]="'Label'"
    [placeholder]="'Placeholder'"
    (valueOnChange)="updateSelectedList($event.detail.value)"
  ></elvia-dropdown>
  `,
  codeVue: `<elvia-dropdown
    :items="[
      { value: 'Norge', label: 'Norge', status: 'info' },
      { value: 'Sverige', label: 'Sverige', status: 'warning' },
      { value: 'Danmark', label: 'Danmark'},
      { value: 'Finland', label: 'Finland', status: 'error' },
    ]"
    :value="{ value: 'Electricity tower', label: 'Electricity tower' }"
    :label="'Label'"
    :placeholder="'Placeholder'"
    @value-on-change="updateSelectedList($event.detail.value)"
  ></elvia-dropdown>
  `,
  codeNativeHTML: `<elvia-dropdown
    id="example-elvia-dropdown-status"
  ></elvia-dropdown>`,

  codeNativeScript: `  const dropdown = document.getElementById('example-elvia-dropdown-status');
    const items = [
      { value: 'Norge', label: 'Norge', status: 'info' },
      { value: 'Sverige', label: 'Sverige', status: 'warning' },
      { value: 'Danmark', label: 'Danmark'},
      { value: 'Finland', label: 'Finland', status: 'error' },
    ];
    dropdown.setProps({label: 'Label' });
    dropdown.setProps({placeholder: 'Placeholder' });
    dropdown.setProps({items: items});
    dropdown.setProps({value: items[1]});
    dropdown.addEventListener('valueOnChange', (event) => {
      console.log('Do what you want with selected elements: ', event.detail.value);
    });
  `,
};

export { dropdownStatusCode };
