const breadcrumbEventCode = {
  name: 'elvis-breadcrumb',
  elementNameW: 'elvia-breadcrumb',
  elementNameR: 'Breadcrumb',
  codeReact: `<Breadcrumb 
  items={[
    {text: 'Home'},
    {text: 'Components'},
    {text: 'Breadcrumbs'},
  ]}
  itemsOnChange={(event) => handleOnChange(event)}
></Breadcrumb>`,
  codeAngular: `<elvia-breadcrumb 
  [items]="[
    {text: 'Home'},
    {text: 'Components'},
    {text: 'Breadcrumbs'},
  ]"
  (itemsOnChange)="handleOnChange($event)"
></elvia-breadcrumb>`,
  codeVue: `<elvia-breadcrumb 
  :items="[
    {text: 'Home'},
    {text: 'Components'},
    {text: 'Breadcrumbs'},
  ]"
  @items-on-change="handleOnChange($event)"
></elvia-breadcrumb>`,
  codeNativeHTML: `<elvia-breadcrumb id="example-elvia-breadcrumb-2"></elvia-breadcrumb>`,
  codeNativeScript: `  const breadcrumb = document.getElementById('example-elvia-breadcrumb-2');
  const items = [
    {text: 'Home'},
    {text: 'Components'},
    {text: 'Breadcrumbs'},
  ];
  breadcrumb.setProps({items: items})
  breadcrumb.addEventListener('itemsOnChange', (event) => {
    console.log('Do what you want with selected breadcrumb: ', event.detail.value)
    // Handle routing here
  });
  `,
};

export { breadcrumbEventCode };
