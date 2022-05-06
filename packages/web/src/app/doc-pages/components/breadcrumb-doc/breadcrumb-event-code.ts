const breadcrumbEventCode = {
  name: 'elvis-breadcrumb',
  elementNameW: 'elvia-breadcrumb',
  elementNameR: 'Breadcrumb',
  codeReact: `<Breadcrumb 
  items={[
    {title: 'Home'},
    {title: 'Components'},
    {title: 'Breadcrumbs'},
  ]}
  itemsOnChange={(event) => handleOnChange(event)}
></Breadcrumb>`,
  codeAngular: `<elvia-breadcrumb 
  [items]="[
    {title: 'Home'},
    {title: 'Components'},
    {title: 'Breadcrumbs'},
  ]"
  (itemsOnChange)="handleOnChange($event)"
></elvia-breadcrumb>`,
  codeVue: `<elvia-breadcrumb 
  :items="[
    {title: 'Home'},
    {title: 'Components'},
    {title: 'Breadcrumbs'},
  ]"
  @items-on-change="handleOnChange($event)"
></elvia-breadcrumb>`,
  codeNativeHTML: `<elvia-breadcrumb id="example-elvia-breadcrumb-2"></elvia-breadcrumb>`,
  codeNativeScript: `  const breadcrumb = document.getElementById('example-elvia-breadcrumb-2');
  const items = [
    {title: 'Home'},
    {title: 'Components'},
    {title: 'Breadcrumbs'},
  ];
  breadcrumb.setProps({items: items})
  breadcrumb.addEventListener('itemsOnChange', (event) => {
    console.log('Do what you want with selected breadcrumb: ', event.detail.value)
    // Handle routing here
  });
  `,
};

export { breadcrumbEventCode };
