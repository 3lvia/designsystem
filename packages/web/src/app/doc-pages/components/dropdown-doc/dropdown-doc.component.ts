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
  exampleOptions = [
    {
      value: 'norge',
      label: 'Norge',
    },
    {
      value: 'sverige',
      label: 'Sverige',
    },
    {
      value: 'danmark',
      label: 'Danmark',
    },
  ];
}
