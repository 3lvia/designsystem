import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { badgeData } from './badge-data';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-badge-doc',
  templateUrl: './badge-doc.component.html',
})
export class BadgeDocComponent {
  figmaUrl = getComponent('badge')?.figmaUrl;
  description = getComponent('badge')?.description;
  title = getComponent('badge')?.title;
  componentData = badgeData;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }
}
