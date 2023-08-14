import { Component } from '@angular/core';
import { outlineData } from './outline-data';

@Component({
  selector: 'app-outline-doc',
  templateUrl: './outline-doc.component.html',
  styleUrls: ['./outline-doc.component.scss'],
})
export class OutlineDocComponent {
  componentData = outlineData;
}
