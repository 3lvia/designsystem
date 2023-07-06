import { Component, ElementRef, ViewChild } from '@angular/core';
import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';
import { TimepickerProps } from '@elvia/elvis-timepicker/react';
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-timepicker-ceg',
  templateUrl: './timepicker-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: TimepickerCegComponent }],
})
export class TimepickerCegComponent implements ComponentExample {
  @ViewChild('timepicker') timepicker: ElementRef<ElvisComponentWrapper>;

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
        selectNowOnOpen: { type: 'checkbox', label: 'Select Current Time', group: 'Options', value: true },
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
      if (propState.controls.minuteInterval?.value !== '1') {
        if (!(propState.disabledControls as any).hasSecondPicker?.includes('minuteInterval')) {
          (propState.disabledControls as any).hasSecondPicker = ['minuteInterval']; // Disables the checkbox
          (propState.controls.hasSecondPicker as any).value = false; // Resets the checkbox
          this.timepicker?.nativeElement?.setProps({ hasSecondPicker: false }); // Updates the prop on the component
        }
      } else {
        (propState.disabledControls as any).hasSecondPicker = [];
      }
    });
  }

  handleOnChange(time: Date): void {
    console.log('Selected time: ', time);
  }
}
