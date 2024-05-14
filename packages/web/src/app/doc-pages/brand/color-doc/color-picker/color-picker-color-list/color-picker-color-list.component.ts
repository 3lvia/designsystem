import { NgClass } from '@angular/common';
import { Component, Input, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { ColorPickerService } from '../color-picker.service';
import { darkColors } from '../colors-dark';
import { lightColors } from '../colors-light';
import { ColorElement } from '../colors-types';
import { getBaseColorName, getHighestContrast, getOpacityColors } from '../colors-util';
import { NeedsBorderPipe } from '../needs-border.pipe';

@Component({
  selector: 'app-color-picker-color-list',
  templateUrl: './color-picker-color-list.component.html',
  styleUrls: ['./color-picker-color-list.component.scss'],
  standalone: true,
  imports: [NgClass, NeedsBorderPipe],
})
export class ColorPickerColorListComponent {
  @Input({ required: true }) category: 'primary' | 'secondary' | 'tertiary' | 'grey';

  private colorPickerService = inject(ColorPickerService);

  theme = toSignal(this.colorPickerService.theme$, {
    initialValue: 'light',
  });
  colorList = computed(() => (this.theme() === 'dark' ? darkColors : lightColors));
  currentColor = toSignal(this.colorPickerService.currentColor$);

  chooseNewColor(color: ColorElement) {
    this.colorPickerService.setChosenColor(color.name);
  }

  getColorsFromCategory = () => {
    if (this.category === 'tertiary') {
      return this.colorList()?.[this.category].slice(0, 6);
    }
    return this.colorList()?.[this.category];
  };

  isChosen = (color: ColorElement) => {
    return getBaseColorName(this.currentColor()?.name) === color.name;
  };

  getOpacityColors(color: ColorElement) {
    return getOpacityColors(color.name, this.colorList()).slice(1).reverse();
  }

  getOpacityColor(i: number) {
    return this.colorList()?.[this.category][i];
  }

  getContrast = (color: ColorElement) => {
    return getHighestContrast(color, this.theme());
  };
}
