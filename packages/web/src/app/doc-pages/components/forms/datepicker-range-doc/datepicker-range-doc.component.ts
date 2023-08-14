import { Component } from '@angular/core';
import { datepickerRangeData } from './datepicker-range-data';

@Component({
  selector: 'app-datepicker-range-doc',
  templateUrl: './datepicker-range-doc.component.html',
  styleUrls: ['./datepicker-range-doc.component.scss'],
})
export class DatepickerRangeDocComponent {
  componentData = datepickerRangeData;
}
