import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColorElement, ColorsObject } from '../colors-types';
import { convertContrastValueToNumber, getColorElement, needsBorder } from '../colors-util';

@Component({
  selector: 'app-color-picker-color-list',
  templateUrl: './color-picker-color-list.component.html',
  styleUrls: ['./color-picker-color-list.component.scss'],
})
export class ColorPickerColorListComponent {
  @Input() currentColor: ColorElement;
  @Input() colorList: ColorsObject;
  @Input() category: 'primary' | 'signal' | 'data' | 'grey';
  @Input() isDarkTheme: boolean;
  @Output() chooseColor = new EventEmitter<ColorElement>();

  needsBorder = needsBorder;

  chooseNewColor(color: ColorElement) {
    this.chooseColor.emit(color);
  }

  getColorsFromCategory = () => {
    return this.colorList?.[this.category];
  };

  isChosen = (color: ColorElement) => {
    if (color.hex === this.currentColor.hex) {
      return true;
    }
    return false;
  };

  getHighestContrast = (color: ColorElement) => {
    const white = convertContrastValueToNumber(color.contrast.white);
    const black = convertContrastValueToNumber(color.contrast.black);
    if (white > black) {
      return getColorElement('white', this.isDarkTheme ? 'dark' : 'light');
    } else {
      return getColorElement('black', this.isDarkTheme ? 'dark' : 'light');
    }
  };
}
