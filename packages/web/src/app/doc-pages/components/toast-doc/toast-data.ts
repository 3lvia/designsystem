import changelogJson from '@elvia/elvis-toast/CHANGELOG.json';
import ComponentData from '../component-data.interface';
import { ToastProps } from '@elvia/elvis-toast/react';

export const toastData: ComponentData<ToastProps> = {
  changelog: changelogJson.content,
  name: 'Toast',
  attributes: {},
};
