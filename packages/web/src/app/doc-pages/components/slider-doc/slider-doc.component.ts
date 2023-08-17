import { Component } from '@angular/core';
import { sliderData } from './slider-data';

@Component({
  selector: 'app-slider-doc',
  templateUrl: './slider-doc.component.html',
})
export class SliderDocComponent {
  componentData = sliderData;
  does = ['When the specific value does not matter but approximate is good enough.'];
  donts = ['When the specific value is important.'];
}
