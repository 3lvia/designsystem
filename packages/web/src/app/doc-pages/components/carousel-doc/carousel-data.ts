import { exampleContents } from 'src/app/shared/example-contents';

export const carouselData = {
  name: 'elvis-carousel',
  elementNameW: 'elvia-carousel',
  elementNameR: 'Carousel',
  attributes: {
    elements: {
      isRequired: true,
      type: 'CarouselElement[] | number',
      description: 'A collection of related items that should be displayed in a carousel',
      displayName: 'No content',
    },
    hideArrows: {
      isRequired: false,
      type: 'boolean',
      description: 'Decides if arrows should be hidden at the ends, disabling cycling through the elements',
      default: 'false',
      displayName: 'Hide arrows',
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
      displayName: 'Checkmark',
      cegType: 'boolean',
      cegFormType: 'checkbox',
      cegOption: 'true',
      cegDisplayGroup: 'Options',
      cegTypeDependency: 'hideArrows',
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
  elements={[
    { title: '${exampleContents.texts.md['eng-GBR'].title}', element: '${exampleContents.texts.md['eng-GBR'].description}' },
    { title: '${exampleContents.texts.xs['eng-GBR'].title}', element: '${exampleContents.texts.xs['eng-GBR'].description}' },
    { title: '${exampleContents.texts.sm['eng-GBR'].title}', element: '${exampleContents.texts.sm['eng-GBR'].description}' }
  ]} 
></Carousel>`,
  codeAngular: `<elvia-carousel
  [elements]="[
    { title: '${exampleContents.texts.md['eng-GBR'].title}', element: '${exampleContents.texts.md['eng-GBR'].description}' },
    { title: '${exampleContents.texts.xs['eng-GBR'].title}', element: '${exampleContents.texts.xs['eng-GBR'].description}' },
    { title: '${exampleContents.texts.sm['eng-GBR'].title}', element: '${exampleContents.texts.sm['eng-GBR'].description}' }
  ]"
></elvia-carousel>`,
  codeNativeHTML: `<elvia-carousel
  id="example-elvia-carousel"
></elvia-carousel>`,
  codeNativeScript: `  const carousel = document.getElementById('example-elvia-carousel');
  const elements = [
    { title: "${exampleContents.texts.md['eng-GBR'].title}", element: "${exampleContents.texts.md['eng-GBR'].description}" },
    { title: "${exampleContents.texts.xs['eng-GBR'].title}", element: "${exampleContents.texts.xs['eng-GBR'].description}" },
    { title: "${exampleContents.texts.sm['eng-GBR'].title}", element: "${exampleContents.texts.sm['eng-GBR'].description}" }
  ];
  carousel.setProps({elements: elements });
`,
  does: [
    'Many items to display and the user only needs to focus on a few at once',
    'Collection of related items',
  ],
  donts: [
    'Should not be use on non-visual items such as links or paragraphs',
    'More than 5 frames - It’s unlikely users will engage with more than that (Use a list instead)',
  ],
};
