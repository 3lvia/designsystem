import { NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';

import { ColorListBaseDirective } from './color-list-base.directive';
import { ColorPickerColorListComponent } from './color-picker-color-list/color-picker-color-list.component';
import { ColorPickerExhibitComponent } from './color-picker-exhibit/color-picker-exhibit.component';
import { ColorPickerHeaderComponent } from './color-picker-header/color-picker-header.component';
import { ColorPickerService } from './color-picker.service';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  imports: [
    NgClass,
    ColorPickerHeaderComponent,
    ColorPickerExhibitComponent,
    ColorListBaseDirective,
    ColorPickerColorListComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ColorPickerComponent {
  private colorPickerService = inject(ColorPickerService);

  theme = this.colorPickerService.theme;
  categories = ['primary', 'secondary', 'tertiary', 'grey'] as const;
}
