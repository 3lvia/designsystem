import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { carouselData } from './carousel-data';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-carousel-doc',
  templateUrl: './carousel-doc.component.html',
  styleUrls: ['./carousel-doc.component.scss'],
})
export class CarouselDocComponent {
  componentData = carouselData;
  does = carouselData.does;
  donts = carouselData.donts;
  title = getComponent('carousel')?.title;
  figmaUrl = getComponent('carousel')?.figmaUrl;
  description = getComponent('carousel')?.description;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }
}
