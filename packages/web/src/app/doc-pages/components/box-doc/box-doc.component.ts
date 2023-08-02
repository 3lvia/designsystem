import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { boxData } from './box-data';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-box-doc',
  templateUrl: './box-doc.component.html',
})
export class BoxDocComponent {
  componentData = boxData;
  figmaUrl = getComponent('box')?.figmaUrl;
  description = getComponent('box')?.description;
  title = getComponent('box')?.title;
  does = ['Grouping content', 'To separate information from the rest of the page'];
  relatedComponents = ['Card', 'Popover'];

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }
}
