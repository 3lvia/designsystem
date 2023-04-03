import { Component } from '@angular/core';
import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';
import { AccordionProps } from '@elvia/elvis-accordion/react';

@Component({
  selector: 'app-accordion-ceg',
  templateUrl: './accordion-ceg.component.html',
  styleUrls: ['./accordion-ceg.component.scss'],
  providers: [{ provide: ComponentExample, useExisting: AccordionCegComponent }],
})
export class AccordionCegComponent implements ComponentExample {
  elementName = 'accordion';
  cegContent = new CegControlManager<AccordionProps>([
    {
      name: 'Normal',
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
        spacingAboveContent: {
          type: 'radioGroup',
          group: 'Spacing Above Content',
          value: '8px',
          radios: [
            { label: '8px', value: '8px' },
            { label: '16px', value: '16px' },
            { label: '24px', value: '24px' },
          ],
        },
        isFullWidth: { type: 'checkbox', group: 'Options', label: 'Full width' },
        isStartAligned: { type: 'checkbox', group: 'Options', label: 'Start Aligned' },
        closeLabel: { type: 'text', group: 'Label When Closed', label: 'Label when closed', value: 'Show' },
        openLabel: { type: 'text', group: 'Label When Open', label: 'Label when open', value: 'Hide' },
      },
      groupOrder: [
        'Position',
        'Size',
        'Spacing Above Content',
        'Options',
        'Label When Closed',
        'Label When Open',
      ],
    },
    {
      name: 'Overflow',
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
        spacingAboveContent: {
          type: 'radioGroup',
          group: 'Spacing Above Content',
          value: '8px',
          radios: [
            { label: '8px', value: '8px' },
            { label: '16px', value: '16px' },
            { label: '24px', value: '24px' },
          ],
        },
        isFullWidth: { type: 'checkbox', group: 'Options', label: 'Full width' },
        isStartAligned: { type: 'checkbox', group: 'Options', label: 'Start Aligned' },
        closeLabel: { type: 'text', group: 'Label When Closed', label: 'Label when closed', value: 'Show' },
        openLabel: { type: 'text', group: 'Label When Open', label: 'Label when open', value: 'Hide' },
      },
      groupOrder: [
        'Position',
        'Size',
        'Spacing Above Content',
        'Options',
        'Label When Closed',
        'Label When Open',
      ],
    },
    {
      name: 'Single',
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
    },
  ]);
}
