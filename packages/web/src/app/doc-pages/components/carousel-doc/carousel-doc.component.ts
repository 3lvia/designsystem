import { Component } from '@angular/core';
import { carouselData } from './carousel-data';

@Component({
  selector: 'app-carousel-doc',
  templateUrl: './carousel-doc.component.html',
  styleUrls: ['./carousel-doc.component.scss'],
})
export class CarouselDocComponent {
  componentData = carouselData;
  does = carouselData.does;
  donts = carouselData.donts;
}
