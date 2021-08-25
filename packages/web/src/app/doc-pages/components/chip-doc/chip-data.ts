
export const chipData = {
  name: 'elvis-chip',
  elementNameW: 'elvia-chip',
  elementNameR: 'Chip',
  attributes: {
    ariaLabel: {
      isRequired: true,
      type: 'string',
      description: 'Aria label should be added for accessibility. Check out the code example in top for inspiration',
    },
    color: {
      isRequired: false,
      type: 'blue |  green | orange | purple | red | violet',
      description: 'Set a background color of the chip',
      default: 'green',
    },
    disabled: {
      isRequired: false,
      type: 'boolean',
      description: 'Set the chip as disabled',
      default: 'false',
    },
    value: {
      isRequired: true,
      type: 'string',
      description: 'The value displayed in the chip',
    },
    type: {
      isRequired: false,
      type: 'removable | legend | choice',
      description: 'Which type of chip should be displayed',
      default: 'standard',
    },
    initiallySelected: {
      isRequired: false,
      type: 'boolean',
      description: 'If the chip should be selected initially. Optional on legend and choice types',
    },
    valueOnChange: {
      isRequired: false,
      type: '(value: string) => void',
      description: 'Gets called every time the value is changed. Required on legend and choice types',
    },
    onDelete: {
      isRequired: false,
      type: '(value: string) => void',
      description: 'Gets called if an item is clicked and it should be deleted. Required on removable type',
    },
  },
  package: 'npm install @elvia/elvis-chip',
  codeImportReact: `import { Chip } from '@elvia/elvis-chip/react';`,
  codeImportWebComponent: `import '@elvia/elvis-chip';`,
  codeReact:
    `
    const deletableChipsList = [
      {value: 2022},
      {value: 2024, color: 'blue'},
      {value: 2025,color: 'purple',disabled: true}
    ]

    const [deletableChips, setDeletableChips] = useState(deletableChipsList);


    const handleOnDelete = (event) => {
      const values = [...deletableChips]
      setDeletableChips(values.filter(data => data.value !== event))
    }

  <div style={{display: 'flex', flexDirection: 'row'}}>
    {deletableChips.map(data => (
      <Chip value={data.value} color={data.color} disabled={data.disabled} ariaLabel={\`Fjern filtreringen for \${data.value}\`} onDelete={handleOnDelete}>
      </Chip>
    ))}
  </div>`,
  codeWebComponent:
    `
    deletableChipsList = [
      {value: 2022},
      {value: 2023, color: 'blue'},
      {value: 2024,color: 'purple',disabled: true}
    ]

    handleOnDelete = (event: number): void => {
      const values = [...this.deletableChipsList]
      this.deletableChipsList = values.filter(value => value.value !== event);
    };

  <div style="display: flex; flex-direction: row">
    <div *ngFor="let chip of deletableChipsList">
      <elvia-chip [value]="chip.value" [color]="chip.color" [ariaLabel]="'Fjern filtrering for ' + chip.value" [disabled]="chip.disabled" (onDelete)="handleOnDelete($event.detail.value)">
      </elvia-chip>
    </div>
  </div>`,
  does: ['To provide an overview of selected options and allows you to easily remove them',
  'Use together with an inputfield'],
  donts: [
    'Not to be used alone without inputfield'  ],
};
