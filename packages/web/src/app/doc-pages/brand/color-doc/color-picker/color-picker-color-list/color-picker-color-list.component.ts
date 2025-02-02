import { NgClass } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';

import { ColorPickerService } from '../color-picker.service';
import { darkColors } from '../colors-dark';
import { lightColors } from '../colors-light';
import { ColorElement, ColorName } from '../colors-types';
import { getBaseColorName, getHighestContrast, getOpacityColors } from '../colors-util';
import { NeedsBorderPipe } from '../needs-border.pipe';

@Component({
  selector: 'app-color-picker-color-list',
  templateUrl: './color-picker-color-list.component.html',
  styleUrls: ['./color-picker-color-list.component.scss'],
  imports: [NgClass, NeedsBorderPipe],
})
export class ColorPickerColorListComponent {
  readonly category = input.required<'primary' | 'secondary' | 'tertiary' | 'grey'>();

  private colorPickerService = inject(ColorPickerService);

  theme = this.colorPickerService.theme;
  colorList = computed(() => (this.theme() === 'dark' ? darkColors : lightColors));
  currentColor = this.colorPickerService.currentColor;

  chooseNewColor(colorName: ColorName) {
    this.colorPickerService.setCurrentColor(colorName);
  }

  getColorsFromCategory = () => {
    const category = this.category();
    if (category === 'tertiary') {
      return this.colorList()?.[category].slice(0, 6);
    }
    return this.colorList()?.[category];
  };

  isChosen = (colorName: ColorName) => {
    return getBaseColorName(this.currentColor()?.name) === colorName;
  };

  getOpacityColors(colorName: ColorName) {
    return getOpacityColors(colorName, this.colorList()).slice(1).reverse();
  }

  getOpacityColor(i: number) {
    return this.colorList()?.[this.category()][i];
  }

  getContrast = (color: ColorElement) => {
    return getHighestContrast(color, this.theme());
  };
}
