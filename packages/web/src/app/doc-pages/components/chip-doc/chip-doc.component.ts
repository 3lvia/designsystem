import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { chipAccessibilityCode } from './chip-accessibility-code';
import { chipData } from './chip-data';

@Component({
  selector: 'app-chips',
  templateUrl: './chip-doc.component.html',
  styleUrls: ['./chip-doc.component.scss'],
})
export class ChipDocComponent {
  figmaUrl = getComponent('chip').figmaUrl;
  description = getComponent('chip').description;
  does = chipData.does;
  donts = chipData.donts;
  componentData = chipData;
  chipAccessibilityCode = chipAccessibilityCode;

  filteredValues = { 2019: false, 2020: true, 2021: true, 2022: false, 2023: true, 2024: true };
  filteredKeys = Object.keys(this.filteredValues);
  deletedValues = [];

  deletableChipsList = [
    { value: 2022, color: 'green' },
    { value: 2023, color: 'blue' },
    { value: 2024, color: 'purple', disabled: true },
  ];

  deletableChipsListInType = [
    { value: 2019 },
    { value: 2020, color: 'green' },
    { value: 2021, color: 'green', disabled: true },
  ];

  colorChips = [
    { value: '2019', color: 'red' },
    { value: '2021', color: 'red' },
    { value: '1239840912', color: 'purple' },
    { value: '1239240913', color: 'purple' },
    { value: '1239240915', color: 'purple' },
    { value: 'Ola Nordmann', color: 'green' },
  ];

  handleOnChange = (event: { value: string; isSelected: boolean }): void => {
    this.filteredValues = { ...this.filteredValues, [event.value]: event.isSelected };
  };

  handleOnDelete = (event: number): void => {
    const values = [...this.deletableChipsList];
    this.deletableChipsList = values.filter((value) => value.value !== event);
  };

  handleOnDeleteInType = (event: number): void => {
    const values = [...this.deletableChipsListInType];
    this.deletableChipsListInType = values.filter((value) => value.value !== event);
  };

  handleOnDeleteColor = (event: string): void => {
    const values = [...this.colorChips];
    this.colorChips = values.filter((value) => value.value !== event);
  };
}
