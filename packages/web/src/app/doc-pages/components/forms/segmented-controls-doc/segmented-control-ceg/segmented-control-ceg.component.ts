import { Component } from '@angular/core';
import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';
import { SegmentedControlProps } from '@elvia/elvis-segmented-control/react';

@Component({
  selector: 'app-segmented-control-ceg',
  templateUrl: './segmented-control-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: SegmentedControlCegComponent }],
})
export class SegmentedControlCegComponent implements ComponentExample {
  elementName = 'segmented-control';
  cegContent = new CegControlManager<SegmentedControlProps>([
    {
      type: 'Text',
      controls: {
        size: {
          type: 'radioGroup',
          value: 'medium',
          radios: [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
          ],
          group: 'Size',
        },
      },
      groupOrder: ['Size'],
      staticProps: {
        items: [{ label: 'Weekly' }, { label: 'Monthly' }, { label: 'Yearly' }],
      },
    },
    {
      type: 'Icon',
      controls: {
        size: {
          type: 'radioGroup',
          value: 'medium',
          radios: [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
          ],
          group: 'Size',
        },
      },
      groupOrder: ['Size'],
      staticProps: {
        items: [
          {
            icon: '<i class="e-icon e-icon--thumbnail"></i>',
            iconSelected: '<i class="e-icon e-icon--thumbnail-color"></i>',
            ariaLabel: 'Segmented control example label',
          },
          {
            icon: '<i class="e-icon e-icon--list"></i>',
            iconSelected: '<i class="e-icon e-icon--list_color"></i>',
            ariaLabel: 'Segmented control example label',
          },
        ],
      },
    },
  ]);

  handleOnChange(value: number): void {
    console.log('Selected value: ', value);
  }
}
