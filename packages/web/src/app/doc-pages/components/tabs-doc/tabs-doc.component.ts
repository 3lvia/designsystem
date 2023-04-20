import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { tabsData } from './tabs-data';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tabs-doc',
  templateUrl: './tabs-doc.component.html',
  styleUrls: ['./tabs-doc.component.scss'],
})
export class TabsDocComponent {
  componentData = tabsData;
  figmaUrl = getComponent('tabs')?.figmaUrl;
  description = getComponent('tabs')?.description;
  title = getComponent('tabs')?.title;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }

  does = ['If you have sub-sections of a page and can not display everything at once'];
  donts = [
    'If the content can be displayed at once.',
    'Don’t use tab in tab.',
    'Primary navigation that links to other pages',
  ];
}
