import changelogJson from '@elvia/elvis-breadcrumb/CHANGELOG.json';
import ComponentData from '../component-data.interface';
import { BaseBreadcrumbProps } from '@elvia/elvis-breadcrumb/react';

const breadcrumbData: ComponentData<BaseBreadcrumbProps> = {
  changelog: changelogJson.content,
  name: 'Breadcrumb',
  attributes: {
    items: {
      isRequired: true,
      type: 'object[]',
      description: 'The links that the breadcrumb consists of. Send in as array of objects.',
      children: {
        href: {
          type: 'string',
          description:
            'The url for the given breadcrumb. Can be omitted to stop the breadcrumb from routing by default',
        },
        text: {
          isRequired: true,
          type: 'string',
          description: 'The visual text for the given breadcrumb.',
        },
      },
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
