const accordionData = {
  name: 'elvis-accordion',
  elementNameW: 'elvia-accordion',
  elementNameR: 'Accordion',
  attributes: {
    content: {
      isRequired: true,
      type: 'string | HTMLElement',
      description: 'Text, images, tables or any other content (use slot in angular if not just text)',
    },
    label: {
      isRequired: false,
      type: 'string[]',
      description:
        'Label for the accordion. Index 0 refers to label while accordion is closd, index 1 refers to label when the accordion is open.',
      default: '["Show more","Hide content"]',
    },
    position: {
      isRequired: false,
      type: '“center” | “start” | “end”',
      description: 'Horizontal positon of label & button',
      default: '“center”',
      displayName: 'position',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['center', 'start', 'end'],
    },
    size: {
      isRequired: false,
      type: '“medium” | “small” | “large”',
      description: 'Size of accordion label & button',
      default: '“medium”',
      displayName: 'Size',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['medium', 'small', 'large'],
    },
    type: {
      isRequired: false,
      type: '“normal” | “overflow”',
      description: 'Variants of accordion',
      default: '“normal”',
      displayName: 'Variants',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['normal', 'overflow'],
    },
  },
  package: 'npm install @elvia/elvis-accordion',
  codeImportReact: `import { Accordion } from '@elvia/elvis-accordion/react';`,
  codeImportWebComponent: `import '@elvia/elvis-accordion';`,
  codeReact: `<Accordion
  type="normal"
  position="center"
  size="medium"
  content="Bacon ipsum dolor amet pork loin bacon jowl turkey. Biltong sausage swine, shankle venison hamburger alcatra spare ribs bacon ham ribeye strip steak. Swine capicola picanha kevin drumstick. Chuck landjaeger pastrami, cow shoulder boudin short loin leberkas t-bone turkey prosciutto jowl. Turkey tail tongue cow shankle chicken tri-tip swine. Prosciutto pig ball tip kielbasa hamburger picanha pork chop tongue chicken shankle short loin filet mignon. T-bone shankle capicola, shoulder hamburger pancetta cupim chuck meatloaf turducken porchetta rump sausage strip steak ribeye."
></Accordion>

`,
  codeWebComponent: `<elvia-accordion
  type="normal"
  position="center"
  size="medium"
  >
  <div slot="content">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pretium leo eget est pellentesque viverra. 
    Nam orci eros, rutrum eget nibh sit amet, volutpat consequat eros. Cras non porttitor nulla, ac consequat dui. 
    Donec tincidunt, elit sit amet consequat pharetra, ante neque molestie lacus, sed mollis quam dolor vitae quam. 
    Nulla malesuada orci ac libero commodo, nec efficitur urna pellentesque. Nulla urna libero, sagittis sit amet fermentum placerat.
  </div>
</elvia-accordion>`,
};

export { accordionData };
