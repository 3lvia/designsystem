import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ColorElement } from '../colors-types';
import { DropdownItem } from '@elvia/elvis-dropdown';
import { ColorLabel, ThemeName, lightTheme } from '@elvia/elvis-colors';
import { darkColors } from '../colors-dark';
import { lightColors } from '../colors-light';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-color-picker-header',
  templateUrl: './color-picker-header.component.html',
})
export class ColorPickerHeaderComponent implements OnChanges {
  @Input({ required: true }) currentTheme: ThemeName = 'light';
  @Input({ required: true }) currentColor: ColorElement;
  @Output() changeThemeEvent = new EventEmitter<ThemeName>();
  @Output() changeColorEvent = new EventEmitter<ColorElement>();

  segmentedControlValue = 0;

  dropdownItems = this.generateDropdownItems();
  dropdownValue?: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.currentTheme) {
      this.segmentedControlValue = changes.currentTheme.currentValue === 'light' ? 0 : 1;

      //If the user has selected a token, we need to update the dropdown value to reflect the current theme
      if (this.dropdownValue) {
        this.dropdownValue = `${changes.currentTheme.currentValue} ${this.dropdownValue.split(' ')[1]}`;

        this.emitChangeColorEvent(
          this.dropdownValue.split(' ')[1] as ColorLabel,
          changes.currentTheme.currentValue,
        );
      }
    }
  }

  private generateDropdownItems(): DropdownItem[] {
    const themes: ThemeName[] = ['light', 'dark'];

    const items: DropdownItem[] = Object.entries(lightTheme).map(([category, tokens]) => {
      const children: DropdownItem[] = Object.entries(tokens).flatMap(([token]) =>
        themes.map((theme) => ({
          label: token,
          value: `${theme} ${token}`,
          icon: `<i class="e-icon e-icon--${theme}_theme e-icon--sm"></i>`,
        })),
      );

      return {
        label: category,
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
    const incomingValue: string = (event as CustomEvent).detail.value;
    this.dropdownValue = incomingValue;

    const [theme, token] = incomingValue.split(' ') as [ThemeName, ColorLabel];
    this.emitChangeThemeEvent(theme);
    this.emitChangeColorEvent(token, theme);
  }

  resetDropdown() {
    this.dropdownValue = undefined;
  }

  private emitChangeColorEvent = (token: ColorLabel, theme: ThemeName) => {
    const colors = theme === 'dark' ? darkColors : lightColors;

    for (const ColorElements of Object.values(colors)) {
      const matchingColor = (ColorElements as ColorElement[]).find((color) => color.token.includes(token));

      if (matchingColor) {
        this.changeColorEvent.emit(matchingColor);
        return;
      }
    }
  };

  private emitChangeThemeEvent = (theme: ThemeName) => {
    this.changeThemeEvent.emit(theme);
  };
}
