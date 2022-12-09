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
  codeReact: `<button>
  Focus via keyboard to receive an outline
</button>

// Add once, to the root of your app
<Outline></Outline>`,
  codeAngular: `<button>
  Focus via keyboard to receive an outline
</button>

// Add once, to the root of your app
<elvia-outline></elvia-outline>`,
  codeVue: `<button>
  Focus via keyboard to receive an outline
</button>

// Add once, to the root of your app
<elvia-outline></elvia-outline>`,
  codeNativeHTML: `<button>
  Focus via keyboard to receive an outline
</button>

// Add once, to the root of your app
<elvia-outline></elvia-outline>
`,
  codeNativeScript: ``,
};
