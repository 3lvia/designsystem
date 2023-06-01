import changelogJson from 'src/assets/changelogs/elvis-breadcrumb/CHANGELOG.json';
import ComponentData from '../component-data.interface';

const breadcrumbData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Breadcrumb',
  attributes: {
    items: {
      isRequired: true,
      type: 'Array<{href: string, text: string}>',
      description:
        'The links that the breadcrumb consists of. Send in as array of objects with the key value pairs of {href: string, text: string}. Href can be omitted to stop the breadcrumb from routing by default.',
    },
    onLinkClick: {
      isRequired: false,
      type: '(value: number) => void',
      description:
        'Gets called every time a breadcrumb is clicked. The value is the index of the clicked breadcrumb in items.',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom CSS classes that can be added to the breadcrumb.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the breadcrumb. Example: {marginTop: '8px', width: '100%'}",
    },
  },
};

export { breadcrumbData };
