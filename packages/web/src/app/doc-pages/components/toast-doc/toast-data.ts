import changelogJson from '@elvia/elvis-toast/CHANGELOG.json';
import { ToastProps } from '@elvia/elvis-toast/react';

import ComponentData from '../component-data.interface';

export const toastData: ComponentData<ToastProps> = {
  changelog: changelogJson.content,
  name: 'Toast',
  attributes: {},
};
