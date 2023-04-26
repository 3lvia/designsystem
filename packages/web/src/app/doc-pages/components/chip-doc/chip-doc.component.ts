import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { chipData } from './chip-data';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-chips',
  templateUrl: './chip-doc.component.html',
  styleUrls: ['./chip-doc.component.scss'],
})
export class ChipDocComponent {
  title = getComponent('chip')?.title;
  figmaUrl = getComponent('chip')?.figmaUrl;
  description = getComponent('chip')?.description;
  does = chipData.does;
  donts = chipData.donts;
  componentData = chipData;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }

  filteredValues = { 2019: false, 2020: true, 2021: true, 2022: false, 2023: true, 2024: true };
  filteredKeys = Object.keys(this.filteredValues);
  deletedValues = [];

  deletableChipsList = [
    { value: 2022, color: 'green' },
    { value: 2023, color: 'blue' },
    { value: 2024, color: 'purple', isDisabled: true },
  ];

  deletableChipsListInType = [
    { value: 2019 },
    { value: 2020, color: 'green' },
    { value: 2021, color: 'green', isDisabled: true },
  ];

  colorChips: { value: string; color: string; disabled?: boolean }[] = [
    { value: '2019', color: 'red' },
    { value: '2021', color: 'red' },
    { value: '1239840912', color: 'purple' },
    { value: '1239240913', color: 'purple' },
    { value: '1239240915', color: 'purple' },
    { value: 'Ola Nordmann', color: 'green' },
  ];

  handleOnChange = (event: { target: { value: string }; detail: { value: boolean } }): void => {
    this.filteredValues = { ...this.filteredValues, [event.target.value]: event.detail.value };
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
