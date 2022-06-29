import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { boxData } from './box-data';

@Component({
  selector: 'app-box-doc',
  templateUrl: './box-doc.component.html',
})
export class BoxDocComponent {
  componentData = boxData;
  figmaUrl = getComponent('box').figmaUrl;
  description = getComponent('box').description;
  does = ['Grouping content', 'To separate information from the rest of the page'];
}
