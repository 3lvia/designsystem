
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
      description: 'The displayed in the chip',
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
    const [chip1Value, setChip1Value] = useState([]);

    <Chips value="2010">
    </Chips>`,
  codeWebComponent:
    `<elvia-chips [value]="2010">
    </elvia-chips>`,
  does: ['To provide an overview of selected options and allows you to easily remove them',
  'Use together with an inputfield'],
  donts: [
    'Not to be used alone without inputfield'  ],
};
