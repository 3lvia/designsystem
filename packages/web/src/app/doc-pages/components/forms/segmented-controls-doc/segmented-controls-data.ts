import changelogJson from 'src/assets/changelogs/elvis-segmented-control/CHANGELOG.json';
import ComponentData from '../../component-data.interface';

export const segmentedControlData: ComponentData = {
  name: 'elvis-segmented-control',
  elementNameW: 'elvia-segmented-control',
  elementNameR: 'SegmentedControl',
  attributes: {
    items: {
      isRequired: true,
      type: 'string | IconName ',
      description:
        'The items represents the controls in the segmented control. When using the icon type, the items should be provided as an IconName e.g. "thumbnail"',
    },
    value: {
      isRequired: false,
      type: 'Number',
      description:
        'The selected value for the segmented control, which should be the index of the selected item.',
      cegDisplayName: 'Value',
      default: '0',
    },
    type: {
      isRequired: false,
      type: '"text" | "icon" ',
      description: 'Type of the segmented control.',
      default: '"text"',
      cegDefault: 0,
      cegType: 'string',
      cegFormType: 'type',
      cegOptions: ['text', 'icon'],
    },
    size: {
      isRequired: false,
      type: '“small” | “medium” | “large”',
      description: 'Size of the segmented control.',
      default: '"medium"',
      cegDisplayName: 'Size',
      cegDefault: 'medium',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['small', 'medium', 'large'],
    },
    valueOnChange: {
      isRequired: false,
      type: '(value: Number) => void',
      description: 'Gets called every time the value is changed and return the new selected control.',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom CSS classes that can be added to the segmented control.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the segmented control. Example: {marginTop: '8px', width: '100%'}",
    },
  },
  package: 'npm install @elvia/elvis-segmented-control',
  codeImportReact: `import { SegmentedControl } from '@elvia/elvis-segmented-control/react';`,
  codeImportTypescriptInterface: `import { SegmentedControlProps } from '@elvia/elvis-segmented-control/react';`,
  codeImportWebComponent: `import '@elvia/elvis-segmented-control';`,
  codeReact: `<SegmentedControl
  items={['thumbnail', 'list']}
  valueOnChange={(event) => handleOnChange(event)}
></SegmentedControl>`,
  codeAngular: `<elvia-segmented-control
  [items]="['thumbnail', 'list']"
  (valueOnChange)="handleOnChange($event.detail.value)"
></elvia-segmented-control>`,
  codeVue: `<elvia-segmented-control
  :items="['thumbnail', 'list']"
  @value-on-change="handleOnChange($event.detail.value)"
></elvia-segmented-control>`,
  codeNativeHTML: `<elvia-segmented-control
  id="example-elvia-segmented-control"
></elvia-segmented-control>`,
  codeNativeScript: `  const segmentedControl = document.getElementById('example-elvia-segmented-control');
  const items = ['thumbnail', 'list']
  segmentedControl.setProps({items: items})
  segmentedControl.addEventListener('valueOnChange', (event) => {
    console.log(event.detail.value)
  });
`,
  changelog: changelogJson.content,
};
