import { KeyValuePipe, NgClass, NgPlural, NgPluralCase, NgStyle, UpperCasePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CopyComponent } from '../../../../../shared/copy/copy.component';
import { ColorListBaseDirective } from '../color-list-base.directive';
import { ColorPickerService } from '../color-picker.service';
import { darkColors } from '../colors-dark';
import { lightColors } from '../colors-light';
import { ColorElement } from '../colors-types';
import { getColorElement, getHighestContrast, getOpacityColors } from '../colors-util';
import { NeedsBorderPipe } from '../needs-border.pipe';
import { ReplacePipe } from 'src/app/shared/pipes/replace.pipe';

@Component({
    selector: 'app-color-picker-exhibit',
    templateUrl: './color-picker-exhibit.component.html',
    styleUrls: ['./color-picker-exhibit.component.scss'],
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
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ColorPickerExhibitComponent {
  private colorPickerService = inject(ColorPickerService);

  theme = this.colorPickerService.theme;
  colorList = computed(() => (this.theme() === 'dark' ? darkColors : lightColors));
  currentColor = this.colorPickerService.currentColor;
  previousColor = this.colorPickerService.previousColor;
  currentColorExistsInCurrentTheme = computed(() => {
    if (this.currentColor() === undefined) {
      return false;
    }
    return !!getColorElement(this.currentColor()?.name, this.theme());
  });
  opacityColors = computed(() => {
    if (this.currentColor() === undefined) {
      return [];
    }
    return getOpacityColors(this.currentColor()?.name, this.colorList());
  });

  chooseColor = (color: ColorElement) => {
    this.colorPickerService.setCurrentColor(color.name);
  };

  getContrast = (color: ColorElement) => {
    return getHighestContrast(color, this.theme());
  };

  getOpacityLevel(colorName: string) {
    const colorLevel = colorName.split('-').pop();
    if (colorLevel != '10' && colorLevel != '30' && colorLevel != '50') {
      return '100';
    }
    return colorLevel;
  }
}
