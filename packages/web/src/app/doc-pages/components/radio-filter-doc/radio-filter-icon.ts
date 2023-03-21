const radioFilterIconCode = {
  codeReact: `<RadioFilter
  items={[
    { label: 'All', value: 'all'},
    { label: 'Read', value: 'read'},
    { label: 'Unread', value: 'unread'},
    { label: '<i class="e-icon e-icon--bookmark-filled e-icon--xs"></i>Flagged', value: 'flagged' },
  ]}
  value={"read"}
  name={"readRadioFiltersIcon"}
  ariaLabel={"{value} filtrering valgt"}
  valueOnChange={(event) => handleValueChange(event)}
></RadioFilter>
  `,
  codeAngular: `<!--Define the items in Typescript:
  const radioFilterItems = [
    { label: 'All', value: 'all'},
    { label: 'Read', value: 'read'},
    { label: 'Unread', value: 'unread'},
    { label: '<i class="e-icon e-icon--bookmark-filled e-icon--xs"></i>Flagged', value: 'flagged' },
  ];-->
<elvia-radio-filter 
  [items]="radioFilterItems"
  [value]="'read'"
  [name]="'readRadioFiltersIcon'"
  [ariaLabel]="'{value} filtrering valgt'"
  (valueOnChange)="handleValueChange($event.detail.value)"
></elvia-radio-filter>
`,
  codeVue: `<!--Define the items in Typescript:
  const radioFilterItems = [
    { label: 'All', value: 'all'},
    { label: 'Read', value: 'read'},
    { label: 'Unread', value: 'unread'},
    { label: '<i class="e-icon e-icon--bookmark-filled e-icon--xs"></i>Flagged', value: 'flagged' },
  ];-->
<elvia-radio-filter 
  :items="radioFilterItems"
  :value="'read'"
  :name="'readRadioFiltersIcon'"
  :ariaLabel="'{value} filtrering valgt'"
  @value-on-change="handleValueChange($event.detail.value)"
></elvia-radio-filter>
  `,
  codeNativeHTML: `<elvia-radio-filter 
  id="example-elvia-radio-filter-icon"
  name="readRadioFiltersIcon"
  value="read"
></elvia-radio-filter>
`,
  codeNativeScript: `  const radioFilter = document.getElementById('example-elvia-radio-filter-icon');
  const filters = [
    { label: "All", value: "all" },
    { label: "Read", value: "read" },
    { label: "Unread", value: "unread" },
    { label: '<i class="e-icon e-icon--bookmark-filled e-icon--xs"></i>Flagged', value: 'flagged' },
  ];
  radioFilter.setProps({items: filters});
  radioFilter.addEventListener('valueOnChange', (event) => {
    console.log('Do something with the new value: ', event.detail.value);
  });
`,
};

export { radioFilterIconCode };
