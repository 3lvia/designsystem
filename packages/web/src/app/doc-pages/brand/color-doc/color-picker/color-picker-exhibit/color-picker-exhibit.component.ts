import { Component, Input } from '@angular/core';
import { ColorElement, ColorsObject } from '../colors-types';
import { getColorElement, getHighestContrast, getOpacityColors } from '../colors-util';
import { ThemeName } from '@elvia/elvis-colors';
import { NeedsBorderPipe } from '../needs-border.pipe';
import { ReplacePipe } from 'src/app/shared/pipes/replace.pipe';
import { RouterLink } from '@angular/router';
import { ColorListBaseDirective } from '../color-list-base.directive';
import { CopyComponent } from '../../../../../shared/copy/copy.component';
import { NgStyle, NgClass, NgPlural, NgPluralCase, UpperCasePipe, KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-color-picker-exhibit',
  templateUrl: './color-picker-exhibit.component.html',
  styleUrls: ['./color-picker-exhibit.component.scss'],
  standalone: true,
  imports: [
    NgStyle,
    NgClass,
    CopyComponent,
    NgPlural,
    NgPluralCase,
    ColorListBaseDirective,
    RouterLink,
    UpperCasePipe,
    KeyValuePipe,
    ReplacePipe,
    NeedsBorderPipe,
  ],
})
export class ColorPickerExhibitComponent {
  @Input({ required: true }) readonly theme: ThemeName;
  @Input({ required: true }) readonly colorList: ColorsObject;
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
    return !!getColorElement(this.currentColor.name, this.theme);
  }

  get opacityColors() {
    return getOpacityColors(this.currentColor.name, this.colorList);
  }

  getContrast = (color: ColorElement) => {
    return getHighestContrast(color, this.theme);
  };

  getOpacityLevel(colorName: string) {
    const colorLevel = colorName.split('-').pop();
    if (colorLevel != '10' && colorLevel != '30' && colorLevel != '50') {
      return '100';
    }
    return colorLevel;
  }
}
