export const chipData = {
  name: 'elvis-chip',
  elementNameW: 'elvia-chip',
  elementNameR: 'Chip',
  attributes: {
    type: {
      isRequired: false,
      type: 'removable | legend | choice',
      description: 'Which type of chip should be displayed',
      default: '"removable"',
      cegDisplayName: 'Types',
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
    },
    disabled: {
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
    selected: {
      isRequired: false,
      type: 'boolean',
      description: 'If the chip should be selected. Optional on legend and choice types',
    },
    valueOnChange: {
      isRequired: false,
      type: '(value: string) => CustomEvent',
      description: 'Gets called every time the value is changed. Required on legend and choice types',
    },
    onDelete: {
      isRequired: false,
      type: '(value: string) => void',
      description:
        'Gets called if an item is clicked and it should be deleted. Required on removable type and not necessary on any of the other types.',
    },
  },
  package: 'npm install @elvia/elvis-chip',
  codeImportReact: `import { Chip } from '@elvia/elvis-chip/react';`,
  codeImportWebComponent: `import '@elvia/elvis-chip';`,
  codeReact: `<Chip 
  value={2022} 
  selected={true}
  ariaLabel={"Fjern filtrering for 2022"}
  onDelete={handleOnDelete($event.detail.value)}
>
</Chip>
`,
  codeAngular: `<elvia-chip 
  [value]="2022" 
  [selected]="true"
  [ariaLabel]="'Fjern filtrering for 2022'" 
  (onDelete)="handleOnDelete($event.detail.value)"
>
</elvia-chip>
  `,
  codeNativeHTML: `<elvia-chip 
  id="example-elvia-chip"
  selected="true"
>
</elvia-chip>
`,
  codeNativeScript: `  const chip = document.getElementById('example-elvia-chip');
  chip.setProps({value: 2022 });
  chip.setProps({ariaLabel: 'Fjern filtrering for 2022' });
  chip.addEventListener('onDelete', () => {
    console.log('Remove element from DOM');
    chip.remove();
  });
`,
  does: [
    'To provide an overview of selected options and allows you to easily remove them',
    'Use together with an inputfield',
  ],
  donts: ['Not to be used alone without inputfield'],
};
