import changelogJson from 'src/assets/changelogs/elvis-chip/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const chipData: ComponentData = {
  name: 'elvis-chip',
  elementNameW: 'elvia-chip',
  elementNameR: 'Chip',
  attributes: {
    type: {
      isRequired: false,
      type: 'removable | legend | choice',
      description: 'Which type of chip should be displayed',
      default: '"removable"',
      cegDefault: 0,
      cegType: 'string',
      cegFormType: 'type',
      cegOptions: ['removable', 'legend', 'choice'],
    },
    ariaLabel: {
      isRequired: true,
      type: 'string',
      description:
        'Aria label should be added for accessibility. Check out the code example in top for inspiration',
    },
    color: {
      isRequired: false,
      type: 'blue | green | orange | purple | red | violet',
      description: 'Set a background color of the chip',
      default: 'green',
      cegDisplayName: 'Color',
      cegDefault: 'green',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['green', 'blue', 'orange', 'purple', 'red', 'violet'],
      cegDependency: [{ name: 'type', value: ['legend', 'removable'] }],
    },
    isDisabled: {
      isRequired: false,
      type: 'boolean',
      description: 'Set the chip as disabled',
      default: 'false',
      cegDisplayName: 'Disabled',
      cegType: 'boolean',
      cegFormType: 'checkbox',
      cegOption: 'true',
      cegDisplayGroup: 'State',
    },
    value: {
      isRequired: true,
      type: 'string',
      description: 'The value displayed in the chip',
    },
    isLoading: {
      isRequired: false,
      type: 'boolean',
      description: 'Sets the chip to have loading state. Only works for legend type',
    },
    isSelected: {
      isRequired: false,
      type: 'boolean',
      description: 'Sets the chip to have the selected state. Optional on legend and choice types',
    },
    isSelectedOnChange: {
      isRequired: false,
      type: '(isSelected: boolean) => CustomEvent',
      description: 'Gets called every time the selected state is changed.',
    },
    onDelete: {
      isRequired: false,
      type: '(value: string) => void',
      description:
        'Gets called if an item is clicked and it should be deleted. Required on removable type and not necessary on any of the other types.',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom css classes that can be added to the chip.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the chip. Example: {marginTop: '8px', width: '100%'}",
    },
  },
  package: 'npm install @elvia/elvis-chip',
  codeImportReact: `import { Chip } from '@elvia/elvis-chip/react';`,
  codeImportWebComponent: `import '@elvia/elvis-chip';`,
  codeReact: `<Chip 
  value={2022} 
  isSelected={true}
  ariaLabel={"Fjern filtrering for 2022"}
  onDelete={(event) => handleOnDelete(event)}
  isSelectedOnChange={(event) => handleIsSelectedOnChange(event)}
>
</Chip>
`,
  codeAngular: `<elvia-chip 
  [value]="2022" 
  [isSelected]="true"
  [ariaLabel]="'Fjern filtrering for 2022'" 
  (onDelete)="handleOnDelete($event.detail.value)"
  (isSelectedOnChange)="handleIsSelectedOnChange($event.detail.value)"
>
</elvia-chip>
  `,
  codeVue: `<elvia-chip 
  :value="2022" 
  :isSelected="true"
  :ariaLabel="'Fjern filtrering for 2022'" 
  @on-delete="handleOnDelete($event.detail.value)"
  @is-selected-on-change="handleIsSelectedOnChange($event.detail.value)"
>
</elvia-chip>
  `,
  codeNativeHTML: `<elvia-chip 
  id="example-elvia-chip"
  isSelected="true"
>
</elvia-chip>
`,
  codeNativeScript: `  const chip = document.getElementById('example-elvia-chip');
  chip.setProps({value: 2022 });
  chip.setProps({ariaLabel: 'Fjern filtrering for 2022' });
  chip.addEventListener('onDelete', () => {
    console.log('Used in REMOVABLE chips - Remove element from DOM');
    chip.remove();
  });
  chip.addEventListener('isSelectedOnChange', () => {
    console.log('Do what you want with updated value');
  });
`,
  changelog: changelogJson.content,
  does: [
    'Used together with filter so the user has control and an overview of what is selected',
    'Simple way for the user to toggle data on and off',
  ],
  donts: [''],
};
