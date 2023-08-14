import { Component } from '@angular/core';
import { tabsData } from './tabs-data';

@Component({
  selector: 'app-tabs-doc',
  templateUrl: './tabs-doc.component.html',
  styleUrls: ['./tabs-doc.component.scss'],
})
export class TabsDocComponent {
  componentData = tabsData;

  does = ['If you have sub-sections of a page and can not display everything at once'];
  donts = [
    'If the content can be displayed at once.',
    'Don’t use tab in tab.',
    'Primary navigation that links to other pages',
  ];
}
