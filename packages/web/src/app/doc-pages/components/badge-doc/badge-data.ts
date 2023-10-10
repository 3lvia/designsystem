import changelogJson from '@elvia/elvis-badge/CHANGELOG.json';
import ComponentData from '../component-data.interface';
import { BaseBadgeProps } from '@elvia/elvis-badge/react';

export const badgeData: ComponentData<BaseBadgeProps> = {
  changelog: changelogJson.content,
  name: 'Badge',
  attributes: {
    content: {
      isRequired: true,
      type: 'string | HTMLElement',
      description: 'Thumbnail or Icon buttons.',
    },
    badgeColor: {
      type: '"red" | "green" | "neutral"',
      description: 'The background color of the badge',
      default: '"green"',
    },
    count: {
      type: 'number | string | undefined',
      description: 'The number displayed inside the badge',
    },
  },
};
