import changelogJson from 'src/assets/changelogs/elvis-badge/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const badgeData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Badge',
  attributes: {
    content: {
      isRequired: true,
      type: 'string | HTMLElement',
      description: 'Thumbnail or Icon buttons.',
    },
    badgeColor: {
      isRequired: false,
      type: '"red" | "green" | "neutral"',
      description: 'The background color of the badge',
      default: '"green"',
    },
    count: {
      isRequired: false,
      type: 'number | string | undefined',
      description: 'The number displayed inside the badge',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom CSS classes that can be added to the badge.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description: 'Custom CSS style object that can be added to the badge.',
    },
  },
};
