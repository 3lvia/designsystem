import changelogJson from '@elvia/elvis-breadcrumb/CHANGELOG.json';
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
      isEvent: true,
      type: '(value: number) => void',
      description:
        'Gets called every time a breadcrumb is clicked. The value is the index of the clicked breadcrumb in items.',
    },
  },
};

export { breadcrumbData };
