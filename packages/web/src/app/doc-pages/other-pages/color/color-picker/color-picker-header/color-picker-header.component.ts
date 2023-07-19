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

type TokenCategory = 'text' | 'background' | 'border' | 'signal' | 'data' | 'icon';
type TokenSubCategory = 'states' | 'element' | 'overlay';
type TokenSubCategoryKeywords = 'disabled' | 'hover' | 'selected' | 'element' | 'overlay';

@Component({
  selector: 'app-color-picker-header',
  templateUrl: './color-picker-header.component.html',
})
export class ColorPickerHeaderComponent implements OnChanges {
  @Input({ required: true }) currentTheme: ThemeName = 'light';
  @Output() changeThemeEvent = new EventEmitter<ThemeName>();
  @Output() changeColorEvent = new EventEmitter<ColorElement>();

  isMobileScreenWidth = window.innerWidth <= 767;

  //keywords that are used to filter out tokens that are not relevant for the dropdown level 1
  tokenKeywords: Record<TokenSubCategory, TokenSubCategoryKeywords[]> = {
    states: ['disabled', 'hover', 'selected'],
    element: ['element'],
    overlay: ['overlay'],
  };

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
      const tokenCategory = category as TokenCategory;

      //second level with "default" tokens
      const children: DropdownItem[] = Object.entries(tokens).flatMap(([token]) => {
        //if the "default token" includes a reserved keyword, skip it. We'll add them later
        if (!this.tokenIncludesReservedKeyword(token)) {
          return [
            {
              label: token,
              value: token,
            },
          ];
        } else {
          return [];
        }
      });

      //the third level with the special tokens
      for (const tokenSubCategory of Object.keys(this.tokenKeywords) as TokenSubCategory[]) {
        const grandChildren = this.getTokenCategoryChildren(tokenSubCategory, tokenCategory);

        if (grandChildren?.children?.length) {
          children.push(grandChildren);
        }
      }

      //top level "TokenCategory" items
      return {
        label: this.capitalizeFirstLetter(tokenCategory),
        value: tokenCategory,
        children: children,
      };
    });

    return items;
  }

  private getTokenCategoryChildren(subCategory: TokenSubCategory, categoryToFilter: TokenCategory) {
    let result: DropdownItem | undefined;

    Object.entries(lightTheme).forEach(([category, tokens]) => {
      //only find the tokens that are relevant for the dropdown level 2
      if (category === categoryToFilter) {
        //ignore the "default" tokens
        const children: ColorLabel[] = Object.entries(tokens)
          .filter(([token]) => this.tokenKeywords[subCategory].some((keyword) => token.includes(keyword)))
          .map(([token]) => token as ColorLabel);

        if (children) {
          result = {
            label: this.capitalizeFirstLetter(subCategory),
            value: subCategory,
            children: children.map((token) => ({ label: token, value: token })),
          };
        } else {
          result = undefined;
        }
      }
    });
    return result;
  }

  private tokenIncludesReservedKeyword(token: string): boolean {
    const allTokenSubCategoryKeywords = Object.values(this.tokenKeywords).flat();
    return allTokenSubCategoryKeywords.some((keyword) => token.includes(keyword));
  }

  handleSegmentedControlChange(event: Event) {
    const incomingValue: number = (event as CustomEvent).detail.value;
    this.emitChangeThemeEvent(incomingValue === 0 ? 'light' : 'dark');
  }

  handleDropdownChange(event: Event) {
    const incomingValue: ColorLabel = (event as CustomEvent).detail.value;
    this.dropdownValue = incomingValue;

    this.emitChangeColorEvent(incomingValue, this.currentTheme);
  }

  resetDropdown() {
    this.dropdownValue = undefined;
  }

  private emitChangeColorEvent = (token: ColorLabel, theme: ThemeName = 'light') => {
    const colors = theme === 'dark' ? darkColors : lightColors;

    for (const colorElements of Object.values(colors)) {
      const matchingColor = Object.values(colorElements as ColorElement[]).find((color) =>
        color.tokens.includes(token),
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
