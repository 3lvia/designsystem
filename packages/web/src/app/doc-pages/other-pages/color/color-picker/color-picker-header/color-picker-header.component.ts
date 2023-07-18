import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ColorElement } from '../colors-types';
import { DropdownItem } from '@elvia/elvis-dropdown';
import { ColorLabel, ThemeName, lightTheme } from '@elvia/elvis-colors';
import { darkColors } from '../colors-dark';
import { lightColors } from '../colors-light';

@Component({
  selector: 'app-color-picker-header',
  templateUrl: './color-picker-header.component.html',
})
export class ColorPickerHeaderComponent implements OnChanges {
  @Input({ required: true }) currentTheme: ThemeName = 'light';
  @Input({ required: true }) currentColor: ColorElement;
  @Output() changeThemeEvent = new EventEmitter<ThemeName>();
  @Output() changeColorEvent = new EventEmitter<ColorElement>();

  isMobileScreenWidth = window.innerWidth <= 767;

  segmentedControlValue = 0;

  dropdownItems = this.generateDropdownItems();
  dropdownValue?: ColorLabel;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.currentTheme) {
      const theme = changes.currentTheme.currentValue as ThemeName;

      this.segmentedControlValue = theme === 'light' ? 0 : 1;

      //If the user has selected a token beforehand, we need to update the dropdown value to reflect the theme change
      if (this.dropdownValue) {
        this.emitChangeColorEvent(this.dropdownValue, theme);
      }
    }
  }

  private generateDropdownItems(): DropdownItem[] {
    const items: DropdownItem[] = Object.entries(lightTheme).map(([category, tokens]) => {
      const children: DropdownItem[] = Object.entries(tokens).flatMap(([token]) => {
        return {
          label: this.capitalizeFirstLetter(token),
          value: token,
        };
      });

      return {
        label: this.capitalizeFirstLetter(category),
        value: category,
        children: children,
      };
    });

    return items;
  }

  handleSegmentedControlChange(event: Event) {
    const incomingValue: number = (event as CustomEvent).detail.value;
    this.emitChangeThemeEvent(incomingValue === 0 ? 'light' : 'dark');
  }

  handleDropdownChange(event: Event) {
    const incomingValue: ColorLabel = (event as CustomEvent).detail.value;
    this.dropdownValue = incomingValue;

    this.emitChangeColorEvent(incomingValue.toLowerCase() as ColorLabel, this.currentTheme);
  }

  resetDropdown() {
    this.dropdownValue = undefined;
  }

  private emitChangeColorEvent = (token: ColorLabel, theme: ThemeName = 'light') => {
    const colors = theme === 'dark' ? darkColors : lightColors;

    for (const colorElements of Object.values(colors)) {
      const matchingColor = Object.values(colorElements as ColorElement[]).find((color) =>
        color.token.includes(token),
      );

      if (matchingColor) {
        this.changeColorEvent.emit(matchingColor);
        return;
      }
    }
  };

  private capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  private emitChangeThemeEvent = (theme: ThemeName) => {
    this.changeThemeEvent.emit(theme);
  };

  @HostListener('window:resize', ['$event'])
  onWindowResize = () => (this.isMobileScreenWidth = window.innerWidth <= 767);
}
