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
    {
      value: 'island',
      label: 'Island',
    },
    {
      value: 'finland',
      label: 'Finland',
    },
    {
      value: 'england',
      label: 'England',
    },
    {
      value: 'tyskland',
      label: 'Tyskland',
    },
    {
      value: 'frankrike',
      label: 'Frankrike',
    },
    {
      value: 'italia',
      label: 'Italia',
    },
  ];
}
