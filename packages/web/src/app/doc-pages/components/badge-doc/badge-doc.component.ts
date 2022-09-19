import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { badgeData } from './badge-data';
import { badgeIconCode } from './badge-icon-code';
@Component({
  selector: 'app-badge-doc',
  templateUrl: './badge-doc.component.html',
})
export class BadgeDocComponent {
  figmaUrl = getComponent('badge').figmaUrl;
  description = getComponent('badge').description;
  componentData = badgeData;
  badgeIconCode = badgeIconCode;
}
