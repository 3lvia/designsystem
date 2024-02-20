import changelogJson from '@elvia/elvis-outline/CHANGELOG.json';
import { OutlineProps } from '@elvia/elvis-outline/react';

import ComponentData from '../component-data.interface';

export const outlineData: ComponentData<OutlineProps> = {
  changelog: changelogJson.content,
  name: 'Outline',
  attributes: {},
};
