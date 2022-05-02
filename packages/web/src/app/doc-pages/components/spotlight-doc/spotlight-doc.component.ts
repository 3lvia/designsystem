import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { spotlightData } from './spotlight-data';

@Component({
  selector: 'app-spotlight-doc',
  templateUrl: './spotlight-doc.component.html',
  styleUrls: ['./spotlight-doc.component.scss'],
})
export class SpotlightDocComponent {
  componentData = spotlightData;
  figmaUrl = getComponent('spotlight').figmaUrl;
  description = getComponent('spotlight').description;
}
