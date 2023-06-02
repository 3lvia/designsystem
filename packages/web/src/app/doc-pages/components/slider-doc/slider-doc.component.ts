import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { sliderUnitCode } from './slider-unit-code';
import { sliderData } from './slider-data';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-slider-doc',
  templateUrl: './slider-doc.component.html',
})
export class SliderDocComponent {
  componentData = sliderData;
  figmaUrl = getComponent('slider')?.figmaUrl;
  description = getComponent('slider')?.description;
  title = getComponent('slider')?.title;
  does = ['When the specific value does not matter but approximate is good enough.'];
  donts = ['When the specific value is important.'];

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }
}
