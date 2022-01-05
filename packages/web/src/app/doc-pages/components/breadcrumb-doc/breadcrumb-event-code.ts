const breadcrumbEventCode = {
  name: 'elvis-breadcrumb',
  elementNameW: 'elvia-breadcrumb',
  elementNameR: 'Breadcrumb',
  codeReact: `<Breadcrumb 
  breadcrumbs={[
    {title: 'Home'},
    {title: 'Components'},
    {title: 'Breadcrumbs'},
  ]}
  breadcrumsOnChange={(event) => handleOnChange(event)}
></Breadcrumb>`,
  codeAngular: `<elvia-breadcrumb 
  [breadcrumbs]="[
    {title: 'Home'},
    {title: 'Components'},
    {title: 'Breadcrumbs'},
  ]"
  (breadcrumsOnChange)="handleOnChange($event)"
></elvia-breadcrumb>`,
  codeVue: `<elvia-breadcrumb 
  :breadcrumbs="[
    {title: 'Home'},
    {title: 'Components'},
    {title: 'Breadcrumbs'},
  ]"
  @breadcrums-on-change="handleOnChange($event)"
></elvia-breadcrumb>`,
  codeNativeHTML: `<elvia-breadcrumb id="example-elvia-breadcrumb-2"></elvia-breadcrumb>`,
  codeNativeScript: ` const breadcrumb = document.getElementById('example-elvia-breadcrumb-2');
  const breadcrumbs = [
    {title: 'Home'},
    {title: 'Components'},
    {title: 'Breadcrumbs'},
  ];
  breadcrumb.setProps({breadcrumbs: breadcrumbs})
  breadcrumb.addEventListener('breadcrumbsOnChange', (event) => {
    console.log('Do what you want with selected breadcrumb: ', event.detail.value)
    // Handle routing here
  });
  `,
};

export { breadcrumbEventCode };
