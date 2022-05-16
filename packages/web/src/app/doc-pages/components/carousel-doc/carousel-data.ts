import { exampleContents } from 'src/app/shared/example-contents';
import changelogJson from 'src/assets/changelogs/elvis-carousel/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const carouselData: ComponentData = {
  name: 'elvis-carousel',
  elementNameW: 'elvia-carousel',
  elementNameR: 'Carousel',
  attributes: {
    items: {
      isRequired: true,
      type: 'CarouselItem[] | number | slot',
      description:
        'A collection of related items that should be displayed in a carousel. If not React, send the items in by slots. Name the slots "item-1", "heading-1", "item-2", "heading-2" and so on.',
      cegDisplayName: 'No content',
    },
    loop: {
      isRequired: false,
      type: 'boolean',
      description: 'Decides if looping through the items should be possible, hides the arrows at the if not.',
      default: 'true',
      cegDisplayName: 'Loop',
      cegType: 'boolean',
      cegFormType: 'checkbox',
      cegOption: 'false',
      cegDefault: true,
      cegDisplayGroup: 'Options',
    },
    hasConfirmationCheckmark: {
      isRequired: false,
      type: 'boolean',
      description:
        'Whether a checkmark button should be used for the last carousel-item. This requires the loop-prop to be disabled. This could be used in an onboarding situation.',
      default: 'false',
      cegDisplayName: 'Confirm button',
      cegType: 'boolean',
      cegFormType: 'checkbox',
      cegOption: 'true',
      cegDisplayGroup: 'Options',
      cegDependency: [{ name: 'loop', value: 'false' }],
    },
    onFinish: {
      isRequired: false,
      type: '() => void',
      description:
        'If loop is disabled and hasConfirmationButton is enbled you might want to do an action when you finish the iteration. When the checkmark is clicked this funtion will be triggered.',
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
    hasAnimation: {
      isRequired: false,
      type: 'boolean',
      description: 'Can be used to turn off the animation when moving between items in the carousel.',
      default: 'true',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom css classes that can be added to the carousel.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the carousel. Example: {marginTop: '8px', width: '100%'}",
    },
  },
  package: 'npm install @elvia/elvis-carousel',
  codeImportReact: `import { Carousel } from '@elvia/elvis-carousel/react';`,
  codeImportWebComponent: `import '@elvia/elvis-carousel';`,
  codeReact: `<Carousel
  items={[
    { 
      heading: <h3 className="e-title-sm">${exampleContents.texts.xs['eng-GBR'].title}</h3>, 
      item: <img 
        alt="Carousel example image" 
        src="../../../../assets/carousel/el1.jpeg"
        style={{width: '100%', minWidth: '278px', borderRadius: '8px'}}
      />
    },
    { 
      heading: <h3 className="e-title-sm">${exampleContents.texts.sm['eng-GBR'].title}</h3>, 
      item: <img 
        alt="Carousel example image" 
        src="../../../../assets/carousel/el2.jpeg"
        style={{width: '100%', minWidth: '278px', borderRadius: '8px'}}
      />
    },
    { 
      heading: <h3 className="e-title-sm">${exampleContents.texts.md['eng-GBR'].title}</h3>, 
      item: <img 
        alt="Carousel example image" 
        src="../../../../assets/carousel/el3.jpeg"
        style={{width: '100%', minWidth: '278px', borderRadius: '8px'}}
      />
    }
  ]} 
></Carousel>`,
  codeAngular: `<elvia-carousel
>
  <div slot="heading-1">
    <h3 class="e-title-sm">${exampleContents.texts.xs['eng-GBR'].title}</h3>
  </div>
  <div slot="item-1">
    <img 
      alt="Carousel example image" 
      src="../../../../assets/carousel/el1.jpeg"
      style="width: 100%; min-width: 278px; border-radius: 8px;" 
    />
  </div>
  <div slot="heading-2">
    <h3 class="e-title-sm">${exampleContents.texts.sm['eng-GBR'].title}</h3>
  </div>
  <div slot="item-2">
    <img 
      alt="Carousel example image" 
      src="../../../../assets/carousel/el2.jpeg"
      style="width: 100%; min-width: 278px; border-radius: 8px;" 
    />
  </div>
  <div slot="heading-3">
    <h3 class="e-title-sm">${exampleContents.texts.md['eng-GBR'].title}</h3>
  </div>
  <div slot="item-3">
    <img 
      alt="Carousel example image" 
      src="../../../../assets/carousel/el3.jpeg"
      style="width: 100%; min-width: 278px; border-radius: 8px;" 
    />
  </div>
</elvia-carousel>`,
  codeVue: `<elvia-carousel
>
  <div slot="heading-1">
    <h3 class="e-title-sm">${exampleContents.texts.xs['eng-GBR'].title}</h3>
  </div>
  <div slot="item-1">
    <img 
      alt="Carousel example image" 
      src="../../../../assets/carousel/el1.jpeg"
      style="width: 100%; min-width: 278px; border-radius: 8px;" 
    />
  </div>
  <div slot="heading-2">
    <h3 class="e-title-sm">${exampleContents.texts.sm['eng-GBR'].title}</h3>
  </div>
  <div slot="item-2">
    <img 
      alt="Carousel example image" 
      src="../../../../assets/carousel/el2.jpeg"
      style="width: 100%; min-width: 278px; border-radius: 8px;" 
    />
  </div>
  <div slot="heading-3">
    <h3 class="e-title-sm">${exampleContents.texts.md['eng-GBR'].title}</h3>
  </div>
  <div slot="item-3">
    <img 
      alt="Carousel example image" 
      src="../../../../assets/carousel/el3.jpeg"
      style="width: 100%; min-width: 278px; border-radius: 8px;" 
    />
  </div>
</elvia-carousel>`,
  codeNativeHTML: `<elvia-carousel
>
  <div slot="heading-1">
    <h3 class="e-title-sm">${exampleContents.texts.xs['eng-GBR'].title}</h3>
  </div>
  <div slot="item-1">
    <img 
      alt="Carousel example image" 
      src="../../../../assets/carousel/el1.jpeg"
      style="width: 100%; min-width: 278px; border-radius: 8px;" 
    />
  </div>
  <div slot="heading-2">
    <h3 class="e-title-sm">${exampleContents.texts.sm['eng-GBR'].title}</h3>
  </div>
  <div slot="item-2">
    <img 
      alt="Carousel example image" 
      src="../../../../assets/carousel/el2.jpeg"
      style="width: 100%; min-width: 278px; border-radius: 8px;" 
    />
  </div>
  <div slot="heading-3">
    <h3 class="e-title-sm">${exampleContents.texts.md['eng-GBR'].title}</h3>
  </div>
  <div slot="item-3">
    <img 
      alt="Carousel example image" 
      src="../../../../assets/carousel/el3.jpeg"
      style="width: 100%; min-width: 278px; border-radius: 8px;" 
    />
  </div>
</elvia-carousel>`,
  codeNativeScript: ``,
  does: [
    'Many items to display and the user only needs to focus on a few at once',
    'Collection of related items',
  ],
  donts: [
    'Should not be use on non-visual items such as links or paragraphs',
    'More than 5 frames - It`s unlikely users will engage with more than that (Use a list instead)',
  ],
  changelog: changelogJson.content,
};
