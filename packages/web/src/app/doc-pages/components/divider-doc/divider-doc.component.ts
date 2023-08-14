import { Component } from '@angular/core';
import { dividerData } from './divider-data';
@Component({
  selector: 'app-divider-doc',
  templateUrl: './divider-doc.component.html',
  styleUrls: ['./divider-doc.component.scss'],
})
export class DividerDocComponent {
  componentData = dividerData;
}
