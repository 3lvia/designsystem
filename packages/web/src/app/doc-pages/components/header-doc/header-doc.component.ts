import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { headerData } from './header-data';

@Component({
  selector: 'app-header-doc',
  templateUrl: './header-doc.component.html',
})
export class HeaderDocComponent {
  componentData = headerData;
  figmaUrl = getComponent('header').figmaUrl;
  description = getComponent('header').description;
}
