import changelogJson from '@elvia/elvis-outline/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const outlineData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Outline',
  attributes: {},
};
