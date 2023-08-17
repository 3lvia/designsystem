import { Component } from '@angular/core';
import { headerData } from './header-data';

@Component({
  selector: 'app-header-doc',
  templateUrl: './header-doc.component.html',
  styleUrls: ['./header-doc.component.scss'],
})
export class HeaderDocComponent {
  componentData = headerData;
}
