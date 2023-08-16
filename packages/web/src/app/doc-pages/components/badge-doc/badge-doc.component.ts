import { Component } from '@angular/core';
import { badgeData } from './badge-data';
@Component({
  selector: 'app-badge-doc',
  templateUrl: './badge-doc.component.html',
})
export class BadgeDocComponent {
  componentData = badgeData;
}
