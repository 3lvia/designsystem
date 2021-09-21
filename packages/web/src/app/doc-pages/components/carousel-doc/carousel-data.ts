export const carouselData = {
  name: 'elvis-carousel',
  elementNameW: 'elvia-carousel',
  elementNameR: 'Carousel',
  elements: [
    {
      title: 'Dette er nytt',
      element:
        'Body text comes here and can go over several lines. It looks like this and when it is two. Body text comes here and can go over several lines. It looks like this and when it is two.Body text comes here and can go over several lines. It looks like this and when it is two.',
    },
    {
      title: 'Hei til ny tariff!',
      element:
        'Body text comes here and can go over several lines. It looks like this and when it is two. Body text comes here and can go over several lines. It looks like this and when it is two.Body text comes here and can go over several lines. It looks like this and when it is two.',
    },
    {
      title: 'Strømbruddsvarsel',
      element:
        'Body text comes here and can go over several lines. It looks like this and when it is two. Body text comes here and can go over several lines. It looks like this and when it is two.Body text comes here and can go over several lines. It looks like this and when it is two.',
    },
    {
      element:
        'Body text comes here and can go over several lines. It looks like this and when it is two. Body text comes here and can go over several lines. It looks like this and when it is two.Body text comes here and can go over several lines. It looks like this and when it is two.',
    },
  ],
  attributes: {
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom css classes that could be added to the carousel',
    },
    elements: {
      isRequired: true,
      type: 'CarouselElement[] | number',
      description: 'A collection of related items that should be displayed in a carousel',
      displayName: 'Carousel',
    },
    hideArrows: {
      isRequired: false,
      type: 'boolean',
      description: 'Decides if arrows should be hidden such that you cannot cycle through elements',
      default: 'false',
    },
    onHide: {
      isRequired: false,
      type: '() => void',
      description:
        'If useOnboardingCheckmark is used you most likely want a close action implemented for the checkmark button',
      default: 'false',
    },
    useOnboardingCheckmark: {
      isRequired: false,
      type: 'boolean',
      description:
        'Whether a checkmark button should be used for the last element. Is used in an onboarding situation and requires hideArrows to also be sent in',
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
  },
  package: 'npm install @elvia/elvis-carousel',
  codeImportReact: `import { Carousel } from '@elvia/elvis-carousel/react';`,
  codeImportWebComponent: `import '@elvia/elvis-carousel';`,
  codeReact: `
    const listOfElements = [
      {
        title: 'Dette er nytt',
        element:
        <p style={{color: 'red'}}>
          Body text comes here and can go over several lines. It looks like this and when it is two. Body text comes here and can go over several lines.

          It looks like this and when it is two.Body text comes here and can go over several lines. It looks like this and when it is two. Body text comes here and can go over several lines. It looks like this and when it is two.
        </p>

      },
      {
        title: <h4>Hei til ny tariff!</h4>,
        element:
        'Body text comes here and can go over several lines. It looks like this and when it is two. Body text comes here and can go over several lines.'
      },
      {
        title: 'Strømbruddsvarsel',
        element:
        <p>
        'Body text comes here and can go over several lines. It looks like this and when it is two. Body text comes here and can go over several lines.'
        </p>,
      },
      {
        element: <img src="https://images.unsplash.com/photo-1533591917057-a0b77b40de75?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="pride" width="300" height="300"/>
      },
      {
        element: <img src="https://animalso.com/wp-content/uploads/2017/11/golden-retriever-husky-mix-4.jpg" alt="pride" width="300" height="300"/>
      },
    ];

    <Carousel
  elements={listOfElements}
></Carousel>`,
  codeAngular: `<elvia-carousel
  [elements]="5"
></elvia-carousel>`,
  codeNativeHTML: `<elvia-carousel
  [elements]="5"
></elvia-carousel>`,
  does: [
    'Many items to display and the user only needs to focus on a few at once',
    'Collection of related items',
  ],
  donts: [
    'Should not be use on non-visual items such as links or paragraphs',
    'More than 5 frames - It’s unlikely users will engage with more than that (Use a list instead)',
  ],
};
