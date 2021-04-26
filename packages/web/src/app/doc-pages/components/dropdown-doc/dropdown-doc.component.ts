import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';
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
  isMulti = true;
  isError = true;
  isDisabled = true;

  isSelected;

  exampleOptions = [
    {
      value: '1',
      label: 'Option 1',
    },
    {
      value: '2',
      label: 'Option 2',
    },
    {
      value: '3',
      label: 'Option 3',
    },
  ];
}
