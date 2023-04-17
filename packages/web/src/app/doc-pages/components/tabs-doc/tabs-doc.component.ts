import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { tabsData } from './tabs-data';
import { exampleContents } from 'src/app/shared/example-contents';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tabs-doc',
  templateUrl: './tabs-doc.component.html',
  styleUrls: ['./tabs-doc.component.scss'],
})
export class TabsDocComponent {
  exampleContents = exampleContents;
  componentData = tabsData;
  does = tabsData.does;
  donts = tabsData.donts;
  figmaUrl = getComponent('tabs')?.figmaUrl;
  description = getComponent('tabs')?.description;
  title = getComponent('tabs')?.title;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }
}
