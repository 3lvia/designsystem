import { Component } from '@angular/core';
import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';
import { CardProps } from '@elvia/elvis-card/react';

@Component({
  selector: 'app-card-ceg',
  templateUrl: './card-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: CardCegComponent }],
})
export class CardCegComponent implements ComponentExample {
  elementName = 'card';
  cegContent = new CegControlManager<CardProps>([
    {
      name: 'Simple',
      controls: {
        borderColor: {
          type: 'radioGroup',
          group: 'Border Color',
          value: 'none',
          radios: [
            { label: 'None', value: 'none' },
            { label: 'Green', value: 'green' },
            { label: 'Blue', value: 'blue' },
            { label: 'Orange', value: 'orange' },
            { label: 'Red', value: 'red' },
          ],
        },
        heading: {
          type: 'text',
          group: 'Heading',
          label: 'Heading',
          value: 'Heading',
        },
        description: {
          type: 'text',
          group: 'Description',
          label: 'Description',
          value: 'This is a card description',
          inputType: 'textarea',
        },
        iconHover: {
          type: 'slotToggle',
          label: 'Colored Icon On Hover',
          group: 'Options',
        },
      },
      groupOrder: ['Border Color', 'Options', 'Heading', 'Description'],
    },
    {
      name: 'Detail',
      controls: {
        heading: {
          type: 'text',
          group: 'Heading',
          label: 'Heading',
          value: 'Heading',
          inputType: 'input',
        },
        description: {
          type: 'text',
          group: 'Description',
          label: 'Description',
          value: 'This is a more detailed description for a detail card that can have longer descriptions.',
          inputType: 'textarea',
        },
        tag: {
          type: 'text',
          group: 'Tag',
          label: 'Tag',
          value: 'Tag',
          inputType: 'input',
        },
      },
      groupOrder: ['Heading', 'Description', 'Tag'],
      hiddenSlots: ['icon', 'iconHover'],
    },
  ]);

  isShowing = false;
}
