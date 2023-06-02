import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { radioFilterData } from './radio-filter.data';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-radio-filter-doc',
  templateUrl: './radio-filter-doc.component.html',
  styleUrls: ['./radio-filter-doc.component.scss'],
})
export class RadioFilterDocComponent {
  componentData = radioFilterData;
  figmaUrl = getComponent('radio-filter')?.figmaUrl;
  description = getComponent('radio-filter')?.description;
  title = getComponent('radio-filter')?.title;

  whens = [
    'Filter/toggle between different views of same content',
    'When you want to have all options visible at all times and not hidden in a dropdown.',
  ];
  whenNots = ['Toggle between different content (then use tabs or segmented control instead)'];

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }
}
