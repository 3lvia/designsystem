import changelogJson from '@elvia/elvis-app-bridge/CHANGELOG.json';
import { BaseAppBridgeProps } from '@elvia/elvis-app-bridge/react';

import ComponentData from '../component-data.interface';

export const appBridgeData: ComponentData<BaseAppBridgeProps> = {
  changelog: changelogJson.content,
  name: 'AppBridge',
  attributes: {
    targetId: {
      isRequired: true,
      type: 'string',
      description: 'The target ID (e.g. a meteringpoint ID) of the links in the app bridge.',
    },
    activeApps: {
      isRequired: false,
      type: 'string[]',
      description:
        'The apps to show in the links in the app bridge. If not provided, all apps will be shown.',
      example: `activeApps=['mdmx', 'msim']`,
    },
  },
};
