import { Component } from '@angular/core';
import { progressbarData } from './progressbar-data';

@Component({
  selector: 'app-progressbar-doc',
  templateUrl: './progressbar-doc.component.html',
  styleUrls: ['./progressbar-doc.component.scss'],
})
export class ProgressbarDocComponent {
  componentData = progressbarData;
}
