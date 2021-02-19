import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';
import { progressbarData } from './progressbar-data';

@Component({
  selector: 'app-progressbar-doc',
  templateUrl: './progressbar-doc.component.html',
  styleUrls: ['./progressbar-doc.component.scss'],
})
export class ProgressbarDocComponent {
  figmaUrl = getComponent('progressbar').figmaUrl;
  description = getComponent('progressbar').description;
  componentData = progressbarData;
}
