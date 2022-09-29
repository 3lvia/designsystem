import changelogJson from 'src/assets/changelogs/elvis-slider/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const sliderData: ComponentData = {
  name: 'elvis-slider',
  elementNameW: 'elvia-slider',
  elementNameR: 'Slider',
  package: 'npm install @elvia/elvis-slider',
  attributes: {
    type: {
      default: '"simple"',
      description: 'Variants of slider.',
      isRequired: false,
      type: '“simple” | “range”',

      cegDefault: 0,
      cegFormType: 'type',
      cegOptions: ['simple', 'range'],
      cegType: 'string',
    },

    hasInputField: {
      default: 'false',
      description: 'Decides if the slider should have input field(s).',
      isRequired: false,
      type: 'boolean',

      cegDefault: false,
      cegDisplayGroup: 'Options',
      cegDisplayName: 'Input field',
      cegFormType: 'checkbox',
      cegOption: 'true',
      cegType: 'boolean',
    },

    displayTooltip: {
      default: 'false',
      description:
        'Decides if a tooltip should be displayed when the user uses the slider. A tooltip is always displayed on devices with touch as their primary input method.',
      isRequired: false,
      type: 'boolean',

      cegDefault: true,
      cegDisplayGroup: 'Options',
      cegDisplayName: 'Display tooltip',
      cegFormType: 'checkbox',
      cegOption: 'false',
      cegType: 'boolean',
    },

    percent: {
      default: 'false',
      description:
        'The tooltip should display the percentage of the distance between minimum and maximum values rather than the actual value itself. Only available on a simple slider.',
      isRequired: false,
      type: 'boolean',

      cegDefault: false,
      cegDependency: [{ name: 'type', value: 'simple' }], //ser ikke ut til å fungere
      cegDisplayGroup: 'Options',
      cegDisplayName: 'Display percentage',
      cegFormType: 'checkbox',
      cegOption: 'true',
      cegType: 'boolean',
    },

    unit: {
      isRequired: false,
      description: 'The unit displayed in the tooltip. For example "kWh", "kr/mnd"',
      type: 'string',
      default: '',

      cegFormType: 'custom-text',
      cegCustomTextType: 'input',
      cegDefault: '',
    },

    label: {
      isRequired: false,
      description: 'A custom label displayed above the inputs. For example "Kilowatt hours"',
      type: 'string',
      default: '',

      cegFormType: 'custom-text',
      cegCustomTextType: 'input',
      cegDefault: '',
    },

    /* TODO: Legge til max i CEG, men bare dersom counten til max aldri kan bli mindre enn min */
    max: {
      default: 100,
      description:
        'The greatest value allowed inside the slider. This value must be greater than the value of the min attribute.',
      isRequired: false,
      type: 'number',
    },

    /* TODO: Legge til min i CEG, men bare dersom counten til min aldri kan bli større enn max */
    min: {
      default: 1,
      description:
        'The lowest value allowed inside the slider. This value must be less than tahen the value of the max attribute.',
      isRequired: false,
      type: 'number',
    },

    value: {
      default: '{min: 1, max: 100}',
      description: 'The default value of the slider. An object for range sliders.',
      isRequired: false,
      type: 'number',
    },

    disabled: {
      default: 'false',
      description: 'Set the slider to a disabled state.',
      isRequired: false,
      type: 'boolean',

      cegDisplayGroup: 'State',
      cegDisplayName: 'Disabled',
      cegFormType: 'checkbox',
      cegOption: 'true',
      cegType: 'boolean',
    },
    className: {
      description: 'Custom CSS classes that can be added to the slider.',
      isRequired: false,
      type: 'string',
    },
    inlineStyle: {
      description:
        "Custom CSS style object that can be added to the slider. Example: {marginTop: '8px', width: '100%'}",
      isRequired: false,
      type: '{[cssProperty: string]: string}',
    },
  },
  codeImportReact: `import { Slider } from '@elvia/elvis-slider/react';`,
  codeImportTypescriptInterface: `import { SliderProps } from '@elvia/elvis-slider/react';`,
  codeImportWebComponent: `import '@elvia/elvis-slider';`,
  /* Bør testes om valueOnChange virker som forventet overalt */
  codeReact: `<Slider 
  min={1} 
  max={100}
  valueOnChange={(event) => handleOnChange(event.detail.value)}
></Sldier>
`,
  codeAngular: `<elvia-slider
  [min]="1"
  [max]="100"
  (valueOnChange)="updateValue($event.detail.value)"
></elvia-slider>
`,
  codeVue: `<elvia-slider
  :min="1"
  :max="100"
  @value-on-change="updateValue($event.detail.value)"
></elvia-slider>
`,
  codeNativeHTML: `<elvia-slider
  min=1
  max=100
  id="example-elvia-slider"
></elvia-slider>

<script>
  
</script>
      
`,
  codeNativeScript: `  const slider = document.getElementById('example-elvia-slider');
  slider.addEventListener('valueOnChange', (event) => {
    console.log(event.detail.value);
  });
`,
  changelog: changelogJson.content,
};
