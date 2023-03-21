import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ComponentExample } from 'src/app/shared/component-documentation/ceg/componentExample';
import { CegCustomText, Controls } from 'src/app/shared/component-documentation/ceg/controlType';

@Component({
  selector: 'app-timepicker-ceg',
  templateUrl: './timepicker-ceg.component.html',
  styleUrls: ['./timepicker-ceg.component.scss'],
  providers: [{ provide: ComponentExample, useExisting: TimepickerCegComponent }],
})
export class TimepickerCegComponent implements ComponentExample {
  /**
   * Ting å tenke på:
   * Hva med "Type" i CEGen?
   *   - Dette kan løses ved å gjøre _controls til en dictionary med key/values med controller-setups.
   *     Finnes det bare èn config, så vises ikke dropdownen
   *
   * Hvordan strukturere kontroller-configen best mulig?
   *   - Sterke typings er et must!
   *   - Lage en setter funksjon som oppdaterer en gitt verdi?
   *
   * Hvorfor er disabled en funksjon?
   *   - Dette lar oss referere til en annen verdi i samme objekt for å skrive logikk på når kontrolleren skal være disabled.
   *
   */
  controls = new BehaviorSubject<Controls>({
    minuteInterval: {
      title: 'Minute interval',
      controls: {
        minuteInterval: {
          type: 'radioGroup',
          value: 10,
          radios: [
            { label: '1', value: 1 },
            { label: '5', value: 5 },
            { label: '10', value: 10 },
            { label: '15', value: 15 },
            { label: '60', value: 60 },
          ],
        },
      },
    },
    state: {
      title: 'State',
      controls: {
        isDisabled: { type: 'checkbox', label: 'Disabled' },
        isFullWidth: { type: 'checkbox', label: 'Full width' },
      },
    },
    size: {
      title: 'Size',
      controls: { isCompact: { type: 'checkbox', label: 'Compact' } },
    },
    options: {
      title: 'Options',
      controls: {
        isRequired: { type: 'checkbox', label: 'Required' },
        selectNowOnOpen: { type: 'checkbox', label: 'Select Now on Open' },
      },
    },
  });

  customText: CegCustomText[] = [];
  elementName = 'timepicker';

  updateValue(name: string, value: string | number | boolean): void {
    console.log('Update', name, value);
  }

  handleOnChange(time: Date): void {
    console.log('Selected time: ', time);
  }
}
