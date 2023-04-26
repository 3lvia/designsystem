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
      name: 'Text',
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
      name: 'Icon',
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
            iconName: 'thumbnail',
            iconNameSelected: 'thumbnailColor',
            ariaLabel: 'Segmented control example label',
          },
          { iconName: 'list', iconNameSelected: 'listColor', ariaLabel: 'Segmented control example label' },
        ],
      },
    },
  ]);

  handleOnChange(value: number): void {
    console.log('Selected value: ', value);
  }
}
