/* The data from this file in each component is used to display information to the user
through the CEG, an installation guide and a properties table. 
These modules should always be imported and added in the html:
- ComponentExampleGeneratorModule
- ComponentPropertiesTableModule
- ComponentInstallationModule
*/

// Use the exampleContents file if you want some fictional data in your component
import { exampleContents } from 'src/app/shared/example-contents';

// Define the componentData
const componentData = {
  name: 'elvis-component', // Component name (package name)
  elementNameW: 'elvia-component', // Component name for the DOM (Custom element)
  elementNameR: 'Component', // Component name for the DOM (React)
  /* All attributes should be added to this list. 
    Some attributes will need more information depending on wether they should be displayed in the CEG or not.
    However 3 attributes are required for all components: 'isRequired', 'type' and 'description'.
    */
  attributes: {
    content: {
      // The actual name of the prop that can be sent into the component
      isRequired: true, // Tells the user if the prop attributes needs to be present when using the component
      type: 'string | HTMLElement', // Tells the user in what format they should add the prop
      description: 'Text, images, tables or any other content (use slot in webcomponent if not just text)', // Should describe what purpose the prop has in the component
    },
    labelPosition: {
      isRequired: false,
      type: '“left” | “center” | “right”',
      description: 'Horizontal position of label & button',
      default: '"center"', // If the component has a default state add it here. If not just skip this attribute.
    },
    /* If the property is supposed to show up in the CEG (typically type, background, state options etc.) 
			you will need to add additional attributes. 
			There are multiple ways to show your props in the CEG, choose between them below.
			*/

    // TYPE - Displayed as dropdown on top of the CEG
    type: {
      isRequired: false,
      type: '“normal” | “overflow”',
      description: 'Types of accordion',
      default: '"normal"',

      cegDefault: 0, // Default index from the options array
      cegType: 'string', // The type of the values sent in with the attribute
      cegFormType: 'type', // Name of the type of content (how to show it in the CEG)
      cegOptions: ['normal', 'overflow'], // Option in the dropdown and the value sent in with the attribute in the code.
    },
    // BACKGROUND - Displayed as dropdown on top of the CEG
    isInverted: {
      isRequired: false,
      type: 'boolean',
      description: 'Decides if tabs should be inverted',
      default: 'false',

      cegDefault: 0, // Default index from the options array
      cegType: 'boolean',
      cegFormType: 'background',
      cegOptions: ['White', 'Dark grey'], // Option in the dropdown
    },
    // RADIO BUTTON - Radiobutton filters often used with different states
    borderColor: {
      isRequired: false,
      type: 'green | blue-berry | red | orange',
      description: 'Color on top of the card',

      cegDisplayName: 'Border color', // Label for radiobutton group
      cegDefault: 'none', // Name of default option
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['none', 'green'], // Represent each radio button and the value sent in with the attribute in the code.
    },
    // CHECKBOX - Often used when you have optional props that can be turned on and off simultaneously.
    useCheckmark: {
      isRequired: false,
      type: 'boolean',
      description: 'Whether a checkmark button should be used for the last element.',
      default: 'false',

      cegDisplayName: 'Confirm button', // Checkbox label
      cegType: 'boolean',
      cegFormType: 'checkbox',
      cegDefault: true, // Wether the checkbox should be checked from start in the CEG
      cegOption: 'true', // The value that will be sent in with the prop e.g. <comp useCheckmark='true'></comp>
      cegDisplayGroup: 'Options', // Add displayGroup to group your checkboxes together under the same label
    },
    // TOGGLE - Should be used when the prop turnes something visible on and off (e.g. heading or )
    isColored: {
      isRequired: false,
      type: 'boolean',
      description: 'Green line on top of box.',
      default: 'false',

      cegDisplayName: 'Colored', // Toggle label
      cegType: 'boolean',
      cegFormType: 'toggle',
      cegDefault: false, // Wether the toggle should be 'on' from start in the CEG
      cegOption: 'true',
    },

    // Dependencies can be added to control when the prop should be able to be used in the CEG.
    dependencyExample: {
      isRequired: false,
      type: 'green | blue-berry | red | orange',
      description: 'Color on top of the card',

      cegDisplayName: 'Border color',
      cegDefault: 'none',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['none', 'green', 'blue-berry', 'red', 'orange'],

      cegDependency: [
        /* If the prop is dependent on another prop to work
					Add the name of the prop it is dependent on and what value the prop should have for it to work. 
					*/
        { name: 'type', value: ['actions', 'info'] },
        { name: 'shape', value: 'square' },
      ],
    },
  },
  // Add install and import information for the component
  package: 'npm install @elvia/elvis-component',
  codeImportReact: `import { Component } from '@elvia/elvis-component/react';`,
  codeImportWebComponent: `import '@elvia/elvis-component';`,
  /* This code is essential for the CEG to function. 
    Three examples of the component should exist, one for each framework.
    The code should be written in the format showing below.
    The native example should also have a script that will be displayed below the html to show
    how to set attributes programmatically without using frameworks. 
    */
  codeReact:
    `<Accordion
  type={"normal"}
  openLabel={"Show"}
  closeLabel={"Hide"}
  labelPosition={"center"}
  size={"medium"}
  content={"` +
    exampleContents.texts.lg['eng-GBR'].description +
    `"}
></Accordion>
`,
  codeAngular:
    `<elvia-accordion
  [type]="'normal'"
  [openLabel]="'Show'"
  [closeLabel]="'Hide'"
  [labelPosition]="'center'"
  [size]="'medium'"
>
  <div slot="content">
    ` +
    exampleContents.texts.lg['eng-GBR'].description +
    `
  </div>
</elvia-accordion>
`,
  codeVue:
    `<elvia-accordion
  :type="'normal'"
  :openLabel="'Show'"
  :closeLabel="'Hide'"
  :labelPosition="'center'"
  :size="'medium'"
>
  <div slot="content">
    ` +
    exampleContents.texts.lg['eng-GBR'].description +
    `
  </div>
</elvia-accordion>
`,
  codeNativeHTML:
    `<elvia-accordion
  type="normal"
  labelPosition="center"
  size="medium"
  id="example-elvia-accordion"
>
  <div slot="content">
    ` +
    exampleContents.texts.lg['eng-GBR'].description +
    `
  </div>
</elvia-accordion>
`,
  codeNativeScript: `  const accordion = document.getElementById('example-elvia-accordion');
  accordion.setProps({openLabel: 'Show' });
  accordion.setProps({closeLabel: 'Hide'});
`,
};

// Export your data
export { componentData };
