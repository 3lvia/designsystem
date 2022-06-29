import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { tabsData } from './tabs-data';
import { exampleContents } from 'src/app/shared/example-contents';

@Component({
  selector: 'app-tabs-doc',
  templateUrl: './tabs-doc.component.html',
})
export class TabsDocComponent {
  exampleContents = exampleContents;
  componentData = tabsData;
  does = tabsData.does;
  donts = tabsData.donts;
  figmaUrl = getComponent('tabs').figmaUrl;
  description = getComponent('tabs').description;
}
