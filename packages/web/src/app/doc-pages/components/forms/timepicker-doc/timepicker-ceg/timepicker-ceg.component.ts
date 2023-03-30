import { Component } from '@angular/core';
import {
  CegControlManager,
  cegControlsFromTsDoc,
  ComponentExample,
} from 'src/app/shared/component-documentation/ceg';
import { TimepickerProps } from '@elvia/elvis-timepicker/react';

@Component({
  selector: 'app-timepicker-ceg',
  templateUrl: './timepicker-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: TimepickerCegComponent }],
})
export class TimepickerCegComponent implements ComponentExample {
  elementName = 'timepicker';
  cegContent = new CegControlManager<TimepickerProps>([
    {
      name: 'Default',
      controls: cegControlsFromTsDoc(this.elementName),
      groupOrder: ['Minute interval', 'State', 'Size', 'Options'],
    },
  ]);

  handleOnChange(time: Date): void {
    console.log('Selected time: ', time);
  }
}
