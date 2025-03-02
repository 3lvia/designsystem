import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { TimepickerProps } from '@elvia/elvis-timepicker/react';

import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-timepicker-ceg',
  templateUrl: './timepicker-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: TimepickerCegComponent }],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TimepickerCegComponent implements ComponentExample {
  private readonly timepicker = viewChild.required<ElementRef<ElvisComponentWrapper>>('timepicker');

  elementName = 'timepicker';
  cegContent = new CegControlManager<TimepickerProps>([
    {
      controls: {
        size: {
          type: 'radioGroup',
          value: 'medium',
          radios: [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
          ],
          group: 'Size',
        },
        minuteInterval: {
          type: 'radioGroup',
          value: '10',
          radios: [
            { label: 'Hours', value: '60' },
            { label: 'Minutes', value: '1' },
            { label: 'Every 5 min', value: '5' },
            { label: 'Every 10 min', value: '10' },
            { label: 'Every 15 min', value: '15' },
          ],
          group: 'Picker Interval',
        },
        hasSecondPicker: {
          type: 'checkbox',
          label: 'Show Seconds',
          value: false,
          group: 'Options',
        },
        isRequired: { type: 'checkbox', label: 'Required', group: 'Options' },
        isFullWidth: { type: 'checkbox', label: 'Full Width', group: 'Options' },
        selectNowOnOpen: { type: 'checkbox', label: 'Select Current Time', group: 'Options', value: false },
        isDisabled: { type: 'checkbox', label: 'Disabled', group: 'State' },
      },
      disabledControls: {}, // Must be defined here for the hack to disable "hasSecondPicker" below
      groupOrder: ['Size', 'Picker Interval', 'Options', 'State'],
    },
  ]);

  constructor() {
    // Slightly hacky way to disable the "hasSecondPicker"-checkbox depending on the "minuteInterval"-prop.
    this.cegContent.componentTypes.pipe(takeUntilDestroyed()).subscribe((types) => {
      const propState = types[0];
      // @ts-expect-error TS1804 (LEGO-3683)8
      if (propState.controls.minuteInterval?.value === '60') {
        // @ts-expect-error TS1804 (LEGO-3683)8
        if (!(propState.disabledControls as any).hasSecondPicker?.includes('minuteInterval')) {
          // @ts-expect-error TS1804 (LEGO-3683)8
          (propState.disabledControls as any).hasSecondPicker = ['minuteInterval']; // Disables the checkbox
          // @ts-expect-error TS1804 (LEGO-3683)8
          (propState.controls.hasSecondPicker as any).value = false; // Resets the checkbox
          this.timepicker().nativeElement?.setProps({ hasSecondPicker: false }); // Updates the prop on the component
        }
      } else {
        // @ts-expect-error TS1804 (LEGO-3683)8
        (propState.disabledControls as any).hasSecondPicker = [];
      }
    });
  }

  handleOnChange(time: Date): void {
    console.log('Selected time: ', time);
  }
}
