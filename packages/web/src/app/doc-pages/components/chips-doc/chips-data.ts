
export const chipsData = {
  name: 'elvis-chips',
  elementNameW: 'elvia-chips',
  elementNameR: 'Carousel',
  attributes: {
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom css classes that could be added to the chips element',
    },
    color: {
      isRequired: false,
      type: 'blue |  green | orange | purple | red | violet',
      description: 'Set a background color',
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
      type: 'standard | clickableDot | clickableCheckmark',
      description: 'Which type of chip should be displayed',
      default: 'standard',
    },
    initiallySelected: {
      isRequired: false,
      type: 'boolean',
      description: 'If the chip should be selected initially',
    },
    valueOnChange: {
      isRequired: false,
      type: '(value: string) => void',
      description: 'Gets called every time the value is changed.',
    },
    onDelete: {
      isRequired: false,
      type: '(value: string) => void',
      description: 'Gets called if an item is clicked and it should be deleted.',
    },
  },
  package: 'npm install @elvia/elvis-chips',
  codeImportReact: `import { Carousel } from '@elvia/elvis-chips/react';`,
  codeImportWebComponent: `import '@elvia/elvis-chips';`,
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
      <Chips value={data.value} color={data.color} disabled={data.disabled} onDelete={handleOnDelete}>
      </Chips>
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
      <elvia-chips [value]="chip.value" [color]="chip.color" [disabled]="chip.disabled" (onDelete)="handleOnDelete($event.detail.value)">
      </elvia-chips>
    </div>
  </div>`,
  does: ['To provide an overview of selected options and allows you to easily remove them',
  'Use together with an inputfield'],
  donts: [
    'Not to be used alone without inputfield'  ],
};
