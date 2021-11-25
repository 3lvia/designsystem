import { exampleContents } from 'src/app/shared/example-contents';

export const carouselData = {
  name: 'elvis-carousel',
  elementNameW: 'elvia-carousel',
  elementNameR: 'Carousel',
  attributes: {
    elements: {
      isRequired: true,
      type: 'CarouselElement[] | number | slot',
      description:
        'A collection of related items that should be displayed in a carousel. If not React, send the elements in by slots. Name the slots "element-1", "title-1", "element-2", "title-2" and so on.',
      cegDisplayName: 'No content',
    },
    type: {
      isRequired: false,
      type: '"simple" | "title" | "curved"',
      description: 'A curved version of the divider, which follow the Elvia curve formula.',
      default: '"simple"',
      cegDisplayName: 'Types',
      cegDefault: 0,
      cegType: 'string',
      cegFormType: 'type',
      cegOptions: ['simple', 'title', 'curved'],
    },
    isInverted: {
      isRequired: false,
      type: 'boolean',
      description: 'If the divider is on a dark grey background this prop should be used.',
      default: 'false',
      cegDefault: 0,
      cegType: 'boolean',
      cegFormType: 'background',
      cegOptions: ['White', 'Dark grey'],
    },
    illustration: {
      isRequired: false,
      type: 'HTMLElement',
      description: 'Illustration/image to be shown in the modal (slot in webcomponent)',
      cegDisplayName: 'Illustration',
      cegType: 'boolean',
      cegFormType: 'toggle',
      cegDefault: 'false',
      cegOption: 'true',
      cegSlot: '<img alt="modal-illustration" src="./../../../../assets/modal/Empty state.png"/>',
    },
    valueCounter: {
      isRequired: false,
      type: 'number',
      description: 'The percentage value of completion',
      default: '0',
      cegDisplayName: 'Loaded',
      cegType: 'number',
      cegFormType: 'counter',
      cegDefault: 20,
      cegCounterMax: 100,
      cegCounterMin: 0,
      cegStepValue: 10,
      cegCounterType: '%',
    },
    typo: {
      isRequired: false,
      type: '“medium” | “caps”',
      description: 'Type of title',
      default: '“medium”',
      cegDisplayName: 'Typography',
      cegDefault: 'medium',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['medium', 'caps'],
      cegDependency: { name: 'type', value: 'title' },
    },
    else: {
      isRequired: false,
      type: 'boolean',
      description:
        'Decides if looping through the elements should be possible, hides the arrows at the if not.',
      default: 'false',
      cegDisplayName: 'Else',
      cegType: 'boolean',
      cegFormType: 'checkbox',
      cegOption: 'true',
      cegDisplayGroup: 'Options 2',
    },
    hideArrows: {
      isRequired: false,
      type: 'boolean',
      description:
        'Decides if looping through the elements should be possible, hides the arrows at the if not.',
      default: 'false',
      cegDisplayName: 'Loop',
      cegType: 'boolean',
      cegFormType: 'checkbox',
      cegOption: 'true',
      cegDisplayGroup: 'Options',
    },
    useOnboardingCheckmark: {
      isRequired: false,
      type: 'boolean',
      description:
        'Whether a checkmark button should be used for the last element. Is used in an onboarding situation and requires hideArrows to also be sent in',
      default: 'false',
      cegDisplayName: 'Confirm button',
      cegType: 'boolean',
      cegFormType: 'checkbox',
      cegOption: 'true',
      cegDisplayGroup: 'Options',
    },
    onHide: {
      isRequired: false,
      type: '() => void',
      description:
        'If useOnboardingCheckmark is used you most likely want a close action implemented for the checkmark button',
      default: 'false',
    },
    value: {
      isRequired: false,
      type: 'number',
      description: 'Index of selected carousel index.',
      default: '0',
    },
    valueOnChange: {
      isRequired: false,
      type: '(value: number) => CustomEvent',
      description: 'Gets called every time the value is changed.',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom css classes that can be added to the carousel.',
    },
  },
  package: 'npm install @elvia/elvis-carousel',
  codeImportReact: `import { Carousel } from '@elvia/elvis-carousel/react';`,
  codeImportWebComponent: `import '@elvia/elvis-carousel';`,
  codeReact: `<Carousel
>
  elements={[
    { 
      title: <h3 class="e-title-sm">${exampleContents.texts.xs['eng-GBR'].title}</h3>, 
      element: <img 
        alt="Carousel example image" 
        src="../../../../assets/carousel/el1.jpeg"
        style={{width: '100%', minWidth: '278px', borderRadius: '8px'}}
      />
    },
    { 
      title: <h3 class="e-title-sm">${exampleContents.texts.sm['eng-GBR'].title}</h3>, 
      element: <img 
        alt="Carousel example image" 
        src="../../../../assets/carousel/el2.jpeg"
        style={{width: '100%', minWidth: '278px', borderRadius: '8px'}}
      />
    },
    { 
      title: <h3 class="e-title-sm">${exampleContents.texts.md['eng-GBR'].title}</h3>, 
      element: <img 
        alt="Carousel example image" 
        src="../../../../assets/carousel/el3.jpeg"
        style={{width: '100%', minWidth: '278px', borderRadius: '8px'}}
      />
    }
  ]} 
></Carousel>`,
  codeAngular: `<elvia-carousel
>
  <div slot="title-1">
    <h3 class="e-title-sm">${exampleContents.texts.xs['eng-GBR'].title}</h3>
  </div>
  <div slot="element-1">
    <img 
      alt="Carousel example image" 
      src="../../../../assets/carousel/el1.jpeg"
      style="width: 100%; min-width: 278px; border-radius: 8px;" 
    />
  </div>
  <div slot="title-2">
    <h3 class="e-title-sm">${exampleContents.texts.sm['eng-GBR'].title}</h3>
  </div>
  <div slot="element-2">
    <img 
      alt="Carousel example image" 
      src="../../../../assets/carousel/el2.jpeg"
      style="width: 100%; min-width: 278px; border-radius: 8px;" 
    />
  </div>
  <div slot="title-3">
    <h3 class="e-title-sm">${exampleContents.texts.md['eng-GBR'].title}</h3>
  </div>
  <div slot="element-3">
    <img 
      alt="Carousel example image" 
      src="../../../../assets/carousel/el3.jpeg"
      style="width: 100%; min-width: 278px; border-radius: 8px;" 
    />
  </div>
</elvia-carousel>`,
  codeNativeHTML: `<elvia-carousel
>
  <div slot="title-1">
    <h3 class="e-title-sm">${exampleContents.texts.xs['eng-GBR'].title}</h3>
  </div>
  <div slot="element-1">
    <img 
      alt="Carousel example image" 
      src="../../../../assets/carousel/el1.jpeg"
      style="width: 100%; min-width: 278px; border-radius: 8px;" 
    />
  </div>
  <div slot="title-2">
    <h3 class="e-title-sm">${exampleContents.texts.sm['eng-GBR'].title}</h3>
  </div>
  <div slot="element-2">
    <img 
      alt="Carousel example image" 
      src="../../../../assets/carousel/el2.jpeg"
      style="width: 100%; min-width: 278px; border-radius: 8px;" 
    />
  </div>
  <div slot="title-3">
    <h3 class="e-title-sm">${exampleContents.texts.md['eng-GBR'].title}</h3>
  </div>
  <div slot="element-3">
    <img 
      alt="Carousel example image" 
      src="../../../../assets/carousel/el3.jpeg"
      style="width: 100%; min-width: 278px; border-radius: 8px;" 
    />
  </div>
</elvia-carousel>`,
  does: [
    'Many items to display and the user only needs to focus on a few at once',
    'Collection of related items',
  ],
  donts: [
    'Should not be use on non-visual items such as links or paragraphs',
    'More than 5 frames - It’s unlikely users will engage with more than that (Use a list instead)',
  ],
};
