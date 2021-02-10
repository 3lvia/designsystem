import { Component } from '@angular/core';
import { getIdentity } from 'src/app/shared/e-items';
import { spacingItems } from './spacing';

@Component({
  selector: 'app-spacing-doc',
  templateUrl: './spacing-doc.component.html',
  styleUrls: ['./spacing-doc.component.scss'],
})
export class SpacingDocComponent {
  spacingItems = spacingItems;
  figmaUrl = getIdentity('spacing').figmaUrl;
  description = getIdentity('spacing').description;

  doCodeCSS = `padding: var(--e-spacing-16);
margin: var(--e-spacing-48);`;
  dontCodeCSS = `padding: var(--e-p-16);
margin:  var(--e-m-48);`;
}
