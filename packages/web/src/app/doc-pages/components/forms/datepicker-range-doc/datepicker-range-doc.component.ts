import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { datepickerRangeData } from './datepicker-range-data';

@Component({
  selector: 'app-datepicker-range-doc',
  templateUrl: './datepicker-range-doc.component.html',
  styleUrls: ['./datepicker-range-doc.component.scss'],
})
export class DatepickerRangeDocComponent {
  figmaUrl = getComponent('datepicker-range').figmaUrl;
  description = getComponent('datepicker-range').description;
  componentData = datepickerRangeData;
}
