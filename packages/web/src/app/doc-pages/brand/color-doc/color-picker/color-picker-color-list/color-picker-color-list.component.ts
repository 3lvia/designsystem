import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColorElement, ColorsObject } from '../colors-types';
import { convertContrastValueToNumber, getColorElement } from '../colors-util';

@Component({
  selector: 'app-color-picker-color-list',
  templateUrl: './color-picker-color-list.component.html',
  styleUrls: ['./color-picker-color-list.component.scss'],
})
export class ColorPickerColorListComponent {
  @Input({ required: true }) currentColor: ColorElement | undefined;
  @Input({ required: true }) colorList: ColorsObject;
  @Input({ required: true }) category: 'primary' | 'signal' | 'data' | 'grey';
  @Input({ required: true }) isDarkTheme: boolean;
  @Output() chooseColor = new EventEmitter<ColorElement>();
  @Output() userChoosesColor = new EventEmitter<void>();

  chooseNewColor(color: ColorElement) {
    this.chooseColor.emit(color);
    this.userChoosesColor.emit();
  }

  getColorsFromCategory = () => {
    return this.colorList?.[this.category];
  };

  isChosen = (color: ColorElement) => {
    return this.currentColor?.hex === color.hex;
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
