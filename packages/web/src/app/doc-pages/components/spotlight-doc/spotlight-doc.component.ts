import { Component } from '@angular/core';
import { spotlightData } from './spotlight-data';

@Component({
  selector: 'app-spotlight-doc',
  templateUrl: './spotlight-doc.component.html',
})
export class SpotlightDocComponent {
  componentData = spotlightData;
}
