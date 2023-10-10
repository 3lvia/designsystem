import changelogJson from '@elvia/elvis-outline/CHANGELOG.json';
import ComponentData from '../component-data.interface';
import { OutlineProps } from '@elvia/elvis-outline/react';

export const outlineData: ComponentData<OutlineProps> = {
  changelog: changelogJson.content,
  name: 'Outline',
  attributes: {},
};
