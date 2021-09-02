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

  filteredValues = { 2019: false, 2020: true, 2021: true, 2022: false, 2023: true, 2024: true};
  filteredKeys = Object.keys(this.filteredValues);
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
    this.filteredValues = { ...this.filteredValues, [event.value]: event.isSelected };

  };

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
