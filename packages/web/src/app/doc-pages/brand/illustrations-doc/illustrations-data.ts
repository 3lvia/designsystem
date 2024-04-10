import changelogJson from '@elvia/elvis-illustrations/CHANGELOG.json';

import ComponentData from '../../components/component-data.interface';

export type IllustrationColor = 'grey' | 'purple' | 'green' | 'blue' | 'orange';

export const illustrationsData: ComponentData<{ color: IllustrationColor }> = {
  changelog: changelogJson.content,
  name: 'Illustrations',
  attributes: {
    color: {
      type: "'grey' | 'purple' | 'green' | 'blue' | 'orange'",
      description: 'Color of the illustration.',
      default: 'grey',
    },
  },
};
