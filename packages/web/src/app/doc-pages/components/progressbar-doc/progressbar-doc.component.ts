import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { progressbarData } from './progressbar-data';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-progressbar-doc',
  templateUrl: './progressbar-doc.component.html',
  styleUrls: ['./progressbar-doc.component.scss'],
})
export class ProgressbarDocComponent {
  figmaUrl = getComponent('progressbar')?.figmaUrl;
  description = getComponent('progressbar')?.description;
  title = getComponent('progressbar')?.title;
  componentData = progressbarData;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }
}
