import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { dropdownData } from './dropdown-data';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-dropdown-doc',
  templateUrl: './dropdown-doc.component.html',
  styleUrls: ['./dropdown-doc.component.scss'],
})
export class DropdownDocComponent {
  componentData = dropdownData;
  figmaUrl = getComponent('dropdown')?.figmaUrl;
  description = getComponent('dropdown')?.description;
  title = getComponent('dropdown')?.title;
  does = [
    'Use dropdowns sparingly - only when the user has 5-15 options and you have limited space to display all options.',
  ];
  donts = [
    'Fewer than 5 options (consider radio filter or radio buttons)',
    'More than 15 options (consider autocomplete)',
  ];

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }
}
