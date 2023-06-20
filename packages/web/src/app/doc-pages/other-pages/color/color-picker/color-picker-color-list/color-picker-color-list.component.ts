import { Component, Input } from '@angular/core';
import { ColorElement, ColorsObject } from '../colors-types';
import { convertContrastValueToNumber, getColorElement } from '../colors-util';

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
  @Input() chooseColor: (color: ColorElement) => void;

  getColorsFromCategory = () => {
    return this.colorList?.[this.category];
  };

  needsBorder = (color: ColorElement) => {
    if (!this.isDarkTheme && (color.name === 'white' || color.name === 'grey-02' || color.name === 'grey-05'))
      return true;
    else if (
      this.isDarkTheme &&
      (color.name === 'black' || color.name === 'grey' || color.name === 'grey-70')
    )
      return true;
    return false;
  };

  isChosen = (color: ColorElement) => {
    console.log(this.currentColor, this.currentColor);
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
