import changelogJson from '@elvia/elvis-badge/CHANGELOG.json';
import { BaseBadgeProps } from '@elvia/elvis-badge/react';

import ComponentData from '../component-data.interface';

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
      type: '"green" | "red" | "orange" | "neutral" | "data-1" | "data-2" | "data-3" | "data-4" | "data-5" | "data-6"',
      description: 'The background color of the badge',
      default: '"green"',
    },
    count: {
      type: 'number | string | undefined',
      description: 'The number displayed inside the badge',
    },
    isHidden: {
      type: 'boolean',
      description: 'Hides the badge',
      default: 'false',
    },
  },
};
