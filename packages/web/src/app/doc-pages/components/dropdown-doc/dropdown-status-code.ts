const dropdownStatusCode = {
  codeReact: `<Dropdown 
    items={[
      { value: 'Danmark', label: 'Danmark', status: 'warning' },
      { value: 'Nord-Makedonia', label: 'Nord-Makedonia'},
      { value: 'Norge', label: 'Norge' },
      { value: 'Oman', label: 'Oman'},
      { value: 'Sverige', label: 'Sverige', status: 'warning' },
    ]} 
    value="Nord-Makedonia"
    label="Label"
    placeholder="Placeholder"
    valueOnChange={(event) => updateSelectedList(event)}
  ></Dropdown>
  `,
  codeAngular: `<elvia-dropdown
    [items]="[
      { value: 'Danmark', label: 'Danmark', status: 'warning' },
      { value: 'Nord-Makedonia', label: 'Nord-Makedonia'},
      { value: 'Norge', label: 'Norge' },
      { value: 'Oman', label: 'Oman'},
      { value: 'Sverige', label: 'Sverige', status: 'warning' },
    ]"
    value="Nord-Makedonia"
    label="Label"
    placeholder="Placeholder"
    (valueOnChange)="updateSelectedList($event.detail.value)"
  ></elvia-dropdown>
  `,
  codeVue: `<elvia-dropdown
    :items="[
      { value: 'Danmark', label: 'Danmark', status: 'warning' },
      { value: 'Nord-Makedonia', label: 'Nord-Makedonia'},
      { value: 'Norge', label: 'Norge' },
      { value: 'Oman', label: 'Oman'},
      { value: 'Sverige', label: 'Sverige', status: 'warning' },
    ]"
    value="Nord-Makedonia"
    label="Label"
    placeholder="Placeholder"
    @value-on-change="updateSelectedList($event.detail.value)"
  ></elvia-dropdown>
  `,
  codeNativeHTML: `<elvia-dropdown
    id="example-elvia-dropdown-status"
  ></elvia-dropdown>`,

  codeNativeScript: `  const dropdown = document.getElementById('example-elvia-dropdown-status');
    const items = [
      { value: 'Danmark', label: 'Danmark', status: 'warning' },
      { value: 'Nord-Makedonia', label: 'Nord-Makedonia'},
      { value: 'Norge', label: 'Norge' },
      { value: 'Oman', label: 'Oman'},
      { value: 'Sverige', label: 'Sverige', status: 'warning' },
    ];
    dropdown.setProps({label: 'Label' });
    dropdown.setProps({placeholder: 'Placeholder' });
    dropdown.setProps({items: items});
    dropdown.setProps({value: items[1].value});
  `,
};

export { dropdownStatusCode };
