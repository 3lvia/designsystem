import changelogJson from 'src/assets/changelogs/elvis-breadcrumb/CHANGELOG.json';
import ComponentData from '../component-data.interface';

const breadcrumbData: ComponentData = {
  name: 'elvis-breadcrumb',
  elementNameW: 'elvia-breadcrumb',
  elementNameR: 'Breadcrumb',
  attributes: {
    items: {
      isRequired: true,
      type: 'Array<object>',
      description:
        'The links that the breadcrumb consists of. Send in as array of objects with the key value pairs of {href: string, text: string}. Url can be omitted to stop the breadcrumb from rerouting by default.',
    },
    onLinkClick: {
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
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the breadcrumb. Example: {marginTop: '8px', width: '100%'}",
    },
  },
  package: 'npm install @elvia/elvis-breadcrumb',
  codeImportReact: `import { Breadcrumb } from '@elvia/elvis-breadcrumb/react';`,
  codeImportWebComponent: `import '@elvia/elvis-breadcrumb';`,
  codeReact: `<Breadcrumb 
  items={[
    { href: 'https://design.elvia.io/', text: 'Home' },
    { href: 'https://design.elvia.io/components', text: 'Components' },
    { href: 'https://design.elvia.io/components/breadcrumb', text: 'Breadcrumbs' }
  ]}
></Breadcrumb>`,
  codeAngular: `<elvia-breadcrumb
  [items]="[
    { href: 'https://design.elvia.io/', text: 'Home' },
    { href: 'https://design.elvia.io/components', text: 'Components' },
    { href: 'https://design.elvia.io/components/breadcrumb', text: 'Breadcrumbs' }
  ]"
></elvia-breadcrumb>`,
  codeVue: `<elvia-breadcrumb
  :items="[
    { href: 'https://design.elvia.io/', text: 'Home' },
    { href: 'https://design.elvia.io/components', text: 'Components' },
    { href: 'https://design.elvia.io/components/breadcrumb', text: 'Breadcrumbs' }
  ]"
></elvia-breadcrumb>`,
  codeNativeHTML: `<elvia-breadcrumb id="example-elvia-breadcrumb">
</elvia-breadcrumb>`,
  codeNativeScript: `  const breadcrumb = document.getElementById('example-elvia-breadcrumb');
  const items = [
    {
      href: 'https://design.elvia.io/',
      text: 'Home',
    },
    {
      href: 'https://design.elvia.io/components',
      text: 'Components',
    },
    {
      href: 'https://design.elvia.io/components/breadcrumb',
      text: 'Breadcrumbs',
    },
  ];
  breadcrumb.setProps({items: items });
  `,
  changelog: changelogJson.content,
};

export { breadcrumbData };
