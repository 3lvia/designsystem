import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-timepicker-doc',
  templateUrl: './timepicker-doc.component.html',
  styleUrls: ['./timepicker-doc.component.scss'],
})
export class TimepickerDocComponent {
  figmaUrl = getComponent('time-picker').figmaUrl;
  description = getComponent('time-picker').description;

  loadedFigmaModel = false;

  hideContentLoader(evt: Event): void {
    if (evt && evt.target) {
      this.loadedFigmaModel = true;
    }
  }
}
