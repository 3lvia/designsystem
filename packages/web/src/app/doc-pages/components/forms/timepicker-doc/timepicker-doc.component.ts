import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { timepickerData } from './timepicker-data';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-timepicker-doc',
  templateUrl: './timepicker-doc.component.html',
  styleUrls: ['./timepicker-doc.component.scss'],
})
export class TimepickerDocComponent {
  componentData = timepickerData;
  figmaUrl = getComponent('timepicker')?.figmaUrl;
  description = getComponent('timepicker')?.description;
  title = getComponent('timepicker')?.title;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }
}
