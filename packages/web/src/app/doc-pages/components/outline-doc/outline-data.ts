import changelogJson from 'src/assets/changelogs/elvis-outline/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const outlineData: ComponentData = {
  changelog: changelogJson.content,
  name: 'elvis-outline',
  elementNameW: 'elvia-outline',
  elementNameR: 'Outline',
  attributes: {
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom CSS classes that can be added to the outline.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the outline. Example: {borderColor: 'black'}",
    },
  },
  codeReact: `<button className="e-btn e-btn--sm">
  Focus via keyboard to receive an outline
</button>
<Outline></Outline>`,
  codeAngular: `<button class="e-btn e-btn--sm">
  Focus via keyboard to receive an outline
</button>
<elvia-outline></elvia-outline>`,
  codeVue: `<button class="e-btn e-btn--sm">
  Focus via keyboard to receive an outline
</button>
<elvia-outline></elvia-outline>`,
  codeNativeHTML: `<button class="e-btn e-btn--sm">
  Focus via keyboard to receive an outline
</button>
<elvia-outline></elvia-outline>
`,
  codeNativeScript: ``,
};
