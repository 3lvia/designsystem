import changelogJson from 'src/assets/changelogs/elvis-spotlight/CHANGELOG.json';
import ComponentData from '../component-data.interface';

const spotlightData: ComponentData = {
  name: 'elvis-spotlight',
  elementNameW: 'elvia-spotlight',
  elementNameR: 'Spotlight',
  attributes: {
    position: {
      isRequired: true,
      type: '{horizontal: number, vertical: number}',
      description:
        'The position represents the center of the circle. The circle will be drawn around the position given.',
      default: '',
    },
    radius: {
      isRequired: false,
      type: 'number',
      description: 'Radius for the spotlight circle',
      default: '200',
    },
    hasLockBodyScroll: {
      isRequired: false,
      type: 'boolean',
      description: 'Locks the body of your page so that you cant scroll while the spotlight is active.',
      default: 'true',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom css classes that can be added to the Spotlight.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description: 'Custom CSS style object that can be added to the Spotlight.',
    },
  },
  package: 'npm install @elvia/elvis-spotlight',
  codeImportReact: `import { Spotlight } from '@elvia/elvis-spotlight/react';`,
  codeImportWebComponent: `import '@elvia/elvis-spotlight';`,
  codeReact: `<Spotlight
  position={{horizontal: 300, vertical: 300}}
  radius={150}>
</Spotlight>
`,
  codeAngular: `<elvia-spotlight
  [position]="{horizontal: 300, vertical: 300}"
  [radius]="150">
</elvia-spotlight>
`,
  codeVue: `<elvia-spotlight
  :position="{horizontal: 300, vertical: 300}"
  :radius="150">
</elvia-spotlight>
`,
  codeNativeHTML: `<button class="e-btn" id="spotlight-trigger" style="position: relative;
  z-index: 999999;">Spotlight</button>
<elvia-spotlight
  id="example-elvia-spotlight">
</elvia-spotlight>
`,
  codeNativeScript: `  const spotlight = document.getElementById('example-elvia-spotlight');
  const spotlightTrigger = document.getElementById('spotlight-trigger');
	spotlight.setProps({className: 'e-none'});
  spotlight.setProps({hasLockBodyScroll: false})
  const rect = spotlightTrigger.getBoundingClientRect();
  const radius = (Math.max(rect.width, rect.height)/2) + 24;
  const horizontal = rect.left + rect.width / 2;
  const vertical = rect.top + rect.height / 2;
  spotlightTrigger.addEventListener('click', (event) => {
    if(spotlight.getProp('className') === 'e-none') {
      spotlight.setProps({className: ''});
      spotlight.setProps({hasLockBodyScroll: true});
    } else {
      spotlight.setProps({className: 'e-none'});
      spotlight.setProps({hasLockBodyScroll: false});
    }
  });
  spotlight.setProps({position: {horizontal: horizontal, vertical: vertical} });
  spotlight.setProps({radius: radius});
`,
  changelog: changelogJson.content,
};

export { spotlightData };
