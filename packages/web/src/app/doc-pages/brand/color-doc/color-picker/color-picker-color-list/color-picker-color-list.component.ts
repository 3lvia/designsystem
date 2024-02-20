import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ThemeName } from '@elvia/elvis-colors';

import { ColorElement, ColorsObject } from '../colors-types';
import { getHighestContrast, getOpacityColors } from '../colors-util';
import { NeedsBorderPipe } from '../needs-border.pipe';

@Component({
  selector: 'app-color-picker-color-list',
  templateUrl: './color-picker-color-list.component.html',
  styleUrls: ['./color-picker-color-list.component.scss'],
  standalone: true,
  imports: [NgClass, NeedsBorderPipe],
})
export class ColorPickerColorListComponent {
  @Input({ required: true }) colorList: ColorsObject;
  @Input({ required: true }) category: 'primary' | 'secondary' | 'tertiary' | 'grey';
  @Input({ required: true }) readonly theme: ThemeName;
  @Output() chooseColor = new EventEmitter<ColorElement>();
  @Output() userChoosesColor = new EventEmitter<void>();
  @Input({ required: true })
  get currentColor(): ColorElement {
    return this._currentColor;
  }

  set currentColor(value: ColorElement | undefined) {
    if (value) {
      this._currentColor = value;
    } else {
      this._currentColor = {
        ...this._currentColor,

        //an empty color element, but keep the name for the empty state
        contrast: { black: '', white: '' },
        hex: '',
        rgb: [-1, -1, -1],
        tokens: [],
      };
    }
  }
  private _currentColor: ColorElement;

  chooseNewColor(color: ColorElement) {
    this.chooseColor.emit(color);
    this.userChoosesColor.emit();
  }

  getColorsFromCategory = () => {
    if (this.category === 'tertiary') {
      return this.colorList?.[this.category].slice(0, 6);
    }
    return this.colorList?.[this.category];
  };

  isChosen = (color: ColorElement) => {
    return this._currentColor?.hex === color.hex;
  };

  getOpacityColors(color: ColorElement) {
    return getOpacityColors(color.name, this.colorList).slice(1).reverse();
  }

  getOpacityColor(i: number) {
    return this.colorList?.[this.category][i];
  }

  getContrast = (color: ColorElement) => {
    return getHighestContrast(color, this.theme);
  };
}
