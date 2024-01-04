import { Component } from '@angular/core';
import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';
import { BaseAccordionProps } from '@elvia/elvis-accordion/react';

@Component({
  selector: 'app-accordion-ceg',
  templateUrl: './accordion-ceg.component.html',
  styleUrls: ['./accordion-ceg.component.scss'],
  providers: [{ provide: ComponentExample, useExisting: AccordionCegComponent }],
})
export class AccordionCegComponent implements ComponentExample {
  elementName = 'accordion';

  cegContent = new CegControlManager<BaseAccordionProps>([
    {
      type: 'Normal',
      controls: {
        labelPosition: {
          type: 'radioGroup',
          group: 'Position',
          value: 'center',
          radios: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
        size: {
          type: 'radioGroup',
          group: 'Size',
          value: 'medium',
          radios: [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
          ],
        },
        isFullWidth: { type: 'checkbox', group: 'Options', label: 'Full width' },
        isStartAligned: { type: 'checkbox', group: 'Options', label: 'Start Aligned' },
        closeLabel: {
          type: 'text',
          group: 'Label While Open',
          label: 'Label while open',
          value: 'Hva er nettleie?',
        },
        openLabel: {
          type: 'text',
          group: 'Label While Closed',
          label: 'Label while closed',
          value: 'Hva er nettleie?',
        },
      },
      groupOrder: ['Position', 'Size', 'Options', 'Label When Closed', 'Label When Open'],
    },
    {
      type: 'Overflow',
      controls: {
        labelPosition: {
          type: 'radioGroup',
          group: 'Position',
          value: 'center',
          radios: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
        size: {
          type: 'radioGroup',
          group: 'Size',
          value: 'medium',
          radios: [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
          ],
        },
        isStartAligned: { type: 'checkbox', group: 'Options', label: 'Start Aligned' },
        closeLabel: {
          type: 'text',
          group: 'Label While Open',
          label: 'Label while open',
          value: 'Hva er nettleie?',
        },
        openLabel: {
          type: 'text',
          group: 'Label While Closed',
          label: 'Label while closed',
          value: 'Hva er nettleie?',
        },
      },
      groupOrder: ['Position', 'Size', 'Options', 'Label When Closed', 'Label When Open'],
    },
    {
      type: 'Single',
      controls: {
        size: {
          type: 'radioGroup',
          group: 'Size',
          value: 'medium',
          radios: [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
          ],
        },
      },
      groupOrder: ['Size'],
      hiddenSlots: ['content'],
    },
  ]);
}
