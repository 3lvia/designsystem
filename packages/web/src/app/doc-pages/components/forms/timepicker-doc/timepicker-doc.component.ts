import { Component } from '@angular/core';
import { timepickerData } from './timepicker-data';

@Component({
  selector: 'app-timepicker-doc',
  templateUrl: './timepicker-doc.component.html',
  styleUrls: ['./timepicker-doc.component.scss'],
})
export class TimepickerDocComponent {
  componentData = timepickerData;
}
