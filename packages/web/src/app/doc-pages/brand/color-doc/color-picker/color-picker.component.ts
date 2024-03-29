import { NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { ThemeName } from '@elvia/elvis-colors';

import { ColorListBaseDirective } from './color-list-base.directive';
import { ColorPickerColorListComponent } from './color-picker-color-list/color-picker-color-list.component';
import { ColorPickerExhibitComponent } from './color-picker-exhibit/color-picker-exhibit.component';
import { ColorPickerHeaderComponent } from './color-picker-header/color-picker-header.component';
import { darkColors } from './colors-dark';
import { lightColors } from './colors-light';
import { ColorElement } from './colors-types';
import { getColorElement } from './colors-util';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  standalone: true,
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
  theme: ThemeName = 'light';
  colorList = this.theme === 'dark' ? darkColors : lightColors;
  currentColor: ColorElement | undefined = this.colorList.primary[0];
  previousColor: ColorElement | undefined;
  categories = ['primary', 'secondary', 'tertiary', 'grey'] as const;

  handleChangeThemeEvent = (newTheme: ThemeName) => {
    this.theme = newTheme;
    this.colorList = newTheme === 'dark' ? darkColors : lightColors;

    if (this.currentColor) {
      this.previousColor = this.currentColor;
    }

    this.currentColor = getColorElement(
      this.currentColor?.name ?? (this.previousColor as ColorElement).name,
      newTheme,
    );
  };

  chooseColor = (color: ColorElement) => {
    this.currentColor = color;
  };
}
