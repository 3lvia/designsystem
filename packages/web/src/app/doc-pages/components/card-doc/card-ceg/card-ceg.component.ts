import { Component } from '@angular/core';
import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';
import { BaseCardProps } from '@elvia/elvis-card/react';

@Component({
  selector: 'app-card-ceg',
  templateUrl: './card-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: CardCegComponent }],
})
export class CardCegComponent implements ComponentExample {
  elementName = 'card';
  cegContent = new CegControlManager<BaseCardProps>([
    {
      type: 'Simple',
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
          value: 'Forbruk',
        },
        description: {
          type: 'text',
          group: 'Description',
          label: 'Description',
          value: '',
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
      type: 'Detail',
      controls: {
        heading: {
          type: 'text',
          group: 'Heading',
          label: 'Heading',
          value: 'Varsler ved lynnedslag',
          inputType: 'input',
        },
        description: {
          type: 'text',
          group: 'Description',
          label: 'Description',
          value: 'Data om prognoser ved lyn og hvordan dette påvirker strømnettet',
          inputType: 'textarea',
        },
        tag: {
          type: 'text',
          group: 'Tag',
          label: 'Tag',
          value: 'Sikkerhet',
          inputType: 'input',
        },
      },
      groupOrder: ['Heading', 'Description', 'Tag'],
      hiddenSlots: ['icon', 'iconHover'],
    },
  ]);

  isShowing = false;
}
