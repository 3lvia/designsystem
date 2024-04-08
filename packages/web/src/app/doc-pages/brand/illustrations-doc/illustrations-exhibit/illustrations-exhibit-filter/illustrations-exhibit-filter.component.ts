import { CommonModule, NgClass, NgTemplateOutlet } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, ViewEncapsulation, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Option } from '@elvia/elvis-radio-filter/react';

import { IllustrationColor } from '../../illustrations-data';
import { IllustrationsExhibitService } from '../illustrations-exhibit.service';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { Theme } from 'src/app/core/services/theme.service';
import { LocalThemeSwitchComponent } from 'src/app/shared/local-theme-switch/local-theme-switch.component';
import { IfViewportSizeDirective } from 'src/app/shared/viewport-size/if-viewport-size.directive';

@Component({
  selector: 'app-illustrations-exhibit-filter',
  standalone: true,
  imports: [IfViewportSizeDirective, NgClass, LocalThemeSwitchComponent],
  templateUrl: './illustrations-exhibit-filter.component.html',
  styleUrl: './illustrations-exhibit-filter.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class IllustrationsExhibitFilterComponent {
  private illustrationExhibitService = inject(IllustrationsExhibitService);
  searchValue = toSignal(this.illustrationExhibitService.searchValue);
  colorFilterValue = toSignal(this.illustrationExhibitService.colorValue);
  locale = toSignal(inject(LocalizationService).listenLocalization());
  theme = toSignal(this.illustrationExhibitService.theme);

  readonly colorFilters = [
    { label: 'Grey', value: 'grey' },
    { label: 'Purple', value: 'purple' },
    { label: 'Green', value: 'green' },
    { label: 'Blue', value: 'blue' },
    { label: 'Orange', value: 'orange' },
  ] satisfies (Option & { value: IllustrationColor })[];

  handleSearchChange = (event: Event) => {
    const newSearch = (event.target as HTMLInputElement).value;
    this.illustrationExhibitService.setSearchValue(newSearch);
  };

  handleColorFilterChange = (event: CustomEvent<{ value: IllustrationColor }>) => {
    const newColor = event.detail.value;
    this.illustrationExhibitService.setColorValue(newColor);
  };

  handleClearSearch = () => {
    this.illustrationExhibitService.setSearchValue('');
  };

  handleNewTheme = (theme: Theme) => {
    this.illustrationExhibitService.setTheme(theme);
  };
}
