import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { dividerData } from './divider-data';
@Component({
  selector: 'app-divider-doc',
  templateUrl: './divider-doc.component.html',
  styleUrls: ['./divider-doc.component.scss'],
})
export class DividerDocComponent {
  figmaUrl = getComponent('divider').figmaUrl;
  description = getComponent('divider').description;
  componentData = dividerData;
}
