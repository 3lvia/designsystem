import { AsyncPipe, NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { Option } from '@elvia/elvis-radio-filter/react';

import { IllustrationColor } from '../../illustrations-data';
import { IllustrationsExhibitService } from '../illustrations-exhibit.service';
import { LocalizationService } from 'src/app/core/services/localization.service';

@Component({
  selector: 'app-illustrations-exhibit-filter',
  standalone: true,
  imports: [AsyncPipe, NgClass],
  templateUrl: './illustrations-exhibit-filter.component.html',
  styleUrl: './illustrations-exhibit-filter.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IllustrationsExhibitFilterComponent {
  constructor(private state: IllustrationsExhibitService) {}

  searchValue = inject(IllustrationsExhibitService).searchValue;
  colorFilterValue = inject(IllustrationsExhibitService).colorValue;
  locale = inject(LocalizationService).listenLocalization();

  readonly colorFilters = [
    { label: 'Grey', value: 'grey' },
    { label: 'Purple', value: 'purple' },
    { label: 'Green', value: 'green' },
    { label: 'Blue', value: 'blue' },
    { label: 'Orange', value: 'orange' },
  ] satisfies (Option & { value: IllustrationColor })[];

  handleSearchChange = (event: Event) => {
    const newSearch = (event.target as HTMLInputElement).value;
    this.state.setSearchValue(newSearch);
  };

  handleColorFilterChange = (event: CustomEvent<{ value: IllustrationColor }>) => {
    const newColor = event.detail.value;
    this.state.setColorValue(newColor);
  };

  handleClearSearch = () => {
    this.state.setSearchValue('');
  };
}
