import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { carouselData } from './carousel-data';
import { exampleContents } from 'src/app/shared/example-contents';

@Component({
  selector: 'app-carousel-doc',
  templateUrl: './carousel-doc.component.html',
})
export class CarouselDocComponent {
  exampleContents = exampleContents;
  componentData = carouselData;
  does = carouselData.does;
  donts = carouselData.donts;
  figmaUrl = getComponent('carousel').figmaUrl;
  description = getComponent('carousel').description;
}
