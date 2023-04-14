import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { spotlightData } from './spotlight-data';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-spotlight-doc',
  templateUrl: './spotlight-doc.component.html',
})
export class SpotlightDocComponent {
  componentData = spotlightData;
  figmaUrl = getComponent('spotlight')?.figmaUrl;
  description = getComponent('spotlight')?.description;
  title = getComponent('spotlight')?.title;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }
}
