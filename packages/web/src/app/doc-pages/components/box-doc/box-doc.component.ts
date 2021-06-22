import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';
import { boxData } from './box-data';

@Component({
  selector: 'app-box-doc',
  templateUrl: './box-doc.component.html',
  styleUrls: ['./box-doc.component.scss']
})
export class BoxDocComponent {
  componentData = boxData;
  figmaUrl = getComponent('box').figmaUrl;
  description = getComponent('box').description;
}
