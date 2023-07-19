import { Component, Input } from '@angular/core';
import { ColorElement } from '../colors-types';
import { getColorElement } from '../colors-util';
import { ThemeName } from '@elvia/elvis-colors';

@Component({
  selector: 'app-color-picker-exhibit',
  templateUrl: './color-picker-exhibit.component.html',
  styleUrls: ['./color-picker-exhibit.component.scss'],
})
export class ColorPickerExhibitComponent {
  @Input({ required: true }) readonly theme: ThemeName;
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

  get currentColorExistsInCurrentTheme(): boolean {
    return !!getColorElement(this.currentColor?.name, this.theme);
  }
}
