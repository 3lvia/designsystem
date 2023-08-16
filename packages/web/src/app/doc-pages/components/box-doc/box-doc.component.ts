import { Component } from '@angular/core';
import { boxData } from './box-data';

@Component({
  selector: 'app-box-doc',
  templateUrl: './box-doc.component.html',
})
export class BoxDocComponent {
  componentData = boxData;
  does = ['Grouping content', 'To separate information from the rest of the page'];
}
