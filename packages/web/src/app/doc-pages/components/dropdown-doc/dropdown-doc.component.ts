import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { dropdownData } from './dropdown-data';
import { exampleContents } from 'src/app/shared/example-contents';
import { dropdownIconsCode } from './dropdown-icons-code';
import { dropdownTreeCode } from './dropdown-tree-code';
import { dropdownStatusCode } from './dropdown-status-code';
import { dropdownLoadMoreItemsCode } from './dropdown-load-more-items-code';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-dropdown-doc',
  templateUrl: './dropdown-doc.component.html',
  styleUrls: ['./dropdown-doc.component.scss'],
})
export class DropdownDocComponent {
  exampleContents = exampleContents;
  componentData = dropdownData;
  does = dropdownData.does;
  donts = dropdownData.donts;
  figmaUrl = getComponent('dropdown')?.figmaUrl;
  description = getComponent('dropdown')?.description;
  title = getComponent('dropdown')?.title;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }

  dropdownIconsCode = dropdownIconsCode;
  dropdownTreeCode = dropdownTreeCode;
  dropdownStatusCode = dropdownStatusCode;
  dropdownLoadMoreItemsCode = dropdownLoadMoreItemsCode;

  isCompact = true;
  isDisabled = true;
  isMulti = true;
  isSearchable = true;

  isSelected;

  exampleOptions = [
    {
      value: 'Norge',
      label: 'Norge',
    },
    {
      value: 'Sverige',
      label: 'Sverige',
    },
    {
      value: 'Danmark',
      label: 'Danmark',
    },
    {
      value: 'Finland',
      label: 'Finland',
    },
    {
      value: 'Island',
      label: 'Island',
    },
  ];
}
