import { Component } from '@angular/core';
import { datepickerData } from './datepicker-data';

@Component({
  selector: 'app-datepicker-doc',
  templateUrl: './datepicker-doc.component.html',
  styleUrls: ['./datepicker-doc.component.scss'],
})
export class DatepickerDocComponent {
  date = new Date(2021, 4, 20);
  date2 = new Date(2022, 0, 15);
  componentData = datepickerData;
}
