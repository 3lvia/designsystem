import changelogJson from 'src/assets/changelogs/elvis-badge/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const badgeData: ComponentData = {
  name: 'elvis-badge',
  elementNameW: 'elvia-badge',
  elementNameR: 'Badge',
  package: 'npm install @elvia/elvis-badge',
  attributes: {
    content: {
      isRequired: true,
      type: 'string | HTMLElement',
      description: 'Thumbnail or Icon buttons. (use slot in webcomponent if not just text)',
    },
    badgeColor: {
      isRequired: false,
      type: '“red” | “green” | “white” | black',
      description: 'The background color of the badge',
      default: '"green"',

      cegDisplayName: 'Badge color',
      cegDefault: 'green',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['green', 'red', 'white', 'black'],
    },
    count: {
      isRequired: false,
      type: 'number | undefined',
      description: 'The number displayed inside the badge',

      //To-do: fikse at denne oppretter count prop-en dersom den ikke finnes fra
      cegDisplayName: 'Count',
      cegType: 'number',
      cegFormType: 'counter',
      cegDefault: 1,
      cegCounterMax: 100,
      cegCounterMin: 0,
      cegStepValue: 1,
      cegCounterType: '',
      /* cegDependency: [{ name: 'type', value: 'numbered' }], virker ikke som forventet. må oppdateres */
    },
    type: {
      isRequired: false,
      type: 'color | numbered',
      description: 'The type of badge decides if the badge is only color or if it will contain a number too',
      default: '"color"',

      cegDefault: 0, // Default index from the options array
      cegType: 'string', // The type of the values sent in with the attribute
      cegFormType: 'type', // Name of the type of content (how to show it in the CEG)
      cegOptions: ['color', 'numbered'], // Option in the dropdown and the value sent in with the attribute in the code.
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom CSS classes that can be added to the badge.' /* nødvendig? */,
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description: 'Custom CSS style object that can be added to the badge.' /* nødvendig? */,
    },
  },
  codeImportReact: `import { Badge } from '@elvia/elvis-badge/react';`,
  codeImportTypescriptInterface: `import { BadgeProps } from '@elvia/elvis-badge/react';`,
  codeImportWebComponent: `import '@elvia/elvis-badge';`,
  codeReact: `<Badge
  count={1}
  content={
    <button
      className="e-thumbnail"
      aria-label="Thumbnail button that opens the image in a larger view"
    >
      <img src="../../../../assets/image.jpg" alt="Thumbnail example image" />
    </button>
  }
/>`,
  codeAngular: `<elvia-badge
  [count]="1"
>
  <button
    class="e-thumbnail"
    aria-label="Thumbnail button that opens the image in a larger view"
    slot="content"
   >
    <img src="https://picsum.photos/200" alt="Thumbnail example image" />
  </button>
</elvia-badge>`,
  codeVue: `<elvia-badge
  :count="1"
>
  <button
    class="e-thumbnail"
    aria-label="Thumbnail button that opens the image in a larger view"
    slot="content"
   >
    <img src="https://picsum.photos/200" alt="Thumbnail example image" />
  </button>
</elvia-badge>`,
  codeNativeHTML: `<elvia-badge
  count="1"
>
  <button
  class="e-thumbnail"
  aria-label="Thumbnail button that opens the image in a larger view"
  slot="content"
  >
  <img src="../../../../../assets/badge/image.jpg" alt="Thumbnail example image" />
  </button>
</elvia-badge>`,
  changelog: changelogJson.content,
  codeNativeScript: ``,
};
