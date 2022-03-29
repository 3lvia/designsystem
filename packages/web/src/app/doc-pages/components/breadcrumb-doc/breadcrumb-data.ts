import changelogJson from 'src/assets/changelogs/elvis-breadcrumb/CHANGELOG.json';
const { content } = changelogJson;

const breadcrumbData = {
  name: 'elvis-breadcrumb',
  elementNameW: 'elvia-breadcrumb',
  elementNameR: 'Breadcrumb',
  attributes: {
    breadcrumbs: {
      isRequired: true,
      type: 'Array<object>',
      description:
        'The links that the breadcrumb consists of. Send in as array of objects with the key value pairs of {url: string, title: string}. Url can be omitted to stop the breadcrumb from rerouting by default.',
    },
    breadcrumbsOnChange: {
      isRequired: false,
      type: '(value: number) => void',
      description:
        'Gets called every time a breadcrumb is clicked. Parameter value is the index of the clicked breadcrumb in breadcrumbs.',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom css classes that can be added to the breadcrumb.',
    },
    inlineStyle: {
      isRequired: false,
      type: 'string',
      description: 'Custom css style that can be added to the breadcrumb.',
    },
  },
  package: 'npm install @elvia/elvis-breadcrumb',
  codeImportReact: `import { Breadcrumb } from '@elvia/elvis-breadcrumb/react';`,
  codeImportWebComponent: `import '@elvia/elvis-breadcrumb';`,
  codeReact: `<Breadcrumb 
  breadcrumbs={[
    { url: 'https://design.elvia.io/', title: 'Home' },
    { url: 'https://design.elvia.io/components', title: 'Components' },
    { url: 'https://design.elvia.io/components/breadcrumb', title: 'Breadcrumbs' }
  ]}
></Breadcrumb>`,
  codeAngular: `<elvia-breadcrumb
  [breadcrumbs]="[
    { url: 'https://design.elvia.io/', title: 'Home' },
    { url: 'https://design.elvia.io/components', title: 'Components' },
    { url: 'https://design.elvia.io/components/breadcrumb', title: 'Breadcrumbs' }
  ]"
></elvia-breadcrumb>`,
  codeVue: `<elvia-breadcrumb
  :breadcrumbs="[
    { url: 'https://design.elvia.io/', title: 'Home' },
    { url: 'https://design.elvia.io/components', title: 'Components' },
    { url: 'https://design.elvia.io/components/breadcrumb', title: 'Breadcrumbs' }
  ]"
></elvia-breadcrumb>`,
  codeNativeHTML: `<elvia-breadcrumb id="example-elvia-breadcrumb">
</elvia-breadcrumb>`,
  codeNativeScript: `  const breadcrumb = document.getElementById('example-elvia-breadcrumb');
  const breadcrumbs = [
    {
      url: 'https://design.elvia.io/',
      title: 'Home',
    },
    {
      url: 'https://design.elvia.io/components',
      title: 'Components',
    },
    {
      url: 'https://design.elvia.io/components/breadcrumb',
      title: 'Breadcrumbs',
    },
  ];
  breadcrumb.setProps({breadcrumbs: breadcrumbs });
  `,
  changelog: content,
};

export { breadcrumbData };
