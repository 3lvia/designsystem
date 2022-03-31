import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { dropdownData } from './dropdown-data';
import { exampleContents } from 'src/app/shared/example-contents';

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
  figmaUrl = getComponent('dropdown').figmaUrl;
  description = getComponent('dropdown').description;

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
