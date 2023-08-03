import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { datepickerRangeData } from './datepicker-range-data';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-datepicker-range-doc',
  templateUrl: './datepicker-range-doc.component.html',
  styleUrls: ['./datepicker-range-doc.component.scss'],
})
export class DatepickerRangeDocComponent {
  title = getComponent('datepicker-range')?.title;
  componentData = datepickerRangeData;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }
}
