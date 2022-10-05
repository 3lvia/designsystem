import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { sliderData } from './slider-data';

@Component({
  selector: 'app-slider-doc',
  templateUrl: './slider-doc.component.html',
})
export class SliderDocComponent {
  componentData = sliderData;
  figmaUrl = getComponent('slider').figmaUrl;
  description = getComponent('slider').description;
  does = ['When the specific value does not matter but approximate is good enough.'];
  donts = ['When the specific value is important.'];
}
