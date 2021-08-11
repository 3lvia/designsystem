import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';
import { carouselData } from './carousel-data';
import { exampleContents } from 'src/app/shared/example-contents';

@Component({
  selector: 'app-carousel-doc',
  templateUrl: './carousel-doc.component.html',
  styleUrls: ['./carousel-doc.component.scss'],
})
export class CarouselDocComponent {
  exampleContents = exampleContents;
  componentData = carouselData;
  does = carouselData.does;
  donts = carouselData.donts;
  elements = carouselData.elements;
  figmaUrl = getComponent('carousel').figmaUrl;
  description = getComponent('carousel').description;
}
