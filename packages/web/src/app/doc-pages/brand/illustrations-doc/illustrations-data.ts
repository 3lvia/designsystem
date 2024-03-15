import changelogJson from '@elvia/elvis-illustrations/CHANGELOG.json';

import ComponentData from '../../components/component-data.interface';

export const illustrationsData: ComponentData<{ color: 'grey' | 'purple' | 'green' | 'blue' | 'orange' }> = {
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
