import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';
import { chipData } from './chip-data';


@Component({
  selector: 'app-chips',
  templateUrl: './chip-doc.component.html',
  styleUrls: ['./chip-doc.component.scss'],
})
export class ChipDocComponent {
  figmaUrl = getComponent('chips').figmaUrl;
  description = getComponent('chips').description;
  does = chipData.does;
  donts = chipData.donts;
  componentData = chipData;

  chipsValues = [2011,2012,2013,2014]
  filteredValues = []
  deletedValues = []

  deletableChipsList = [
    {value: 2022, color: 'green'},
    {value: 2023, color: 'blue'},
    {value: 2024,color: 'purple',disabled: true}
  ]

  deletableChipsListInType = [
    {value: 2019},
    {value: 2020, color: 'red'},
    {value: 2021,color: 'blue',disabled: true}
  ]

  handleOnChange = (event: {value: string; isSelected: boolean}): void => {
    const values = [...this.filteredValues]
    if (event.isSelected) {
      this.filteredValues = [...this.filteredValues,event.value]
    }
    else if (!event.isSelected) {
      this.filteredValues = values.filter(value => value !== event.value);
    }
  }

  handleOnDelete = (event: number): void => {
    const values = [...this.deletableChipsList]
    this.deletableChipsList = values.filter(value => value.value !== event);
  };

  handleOnDeleteInType = (event: number): void => {
    this.deletedValues = [...this.deletedValues, event]
    const values = [...this.deletableChipsListInType]
    this.deletableChipsListInType = values.filter(value => value.value !== event);
  };
}
