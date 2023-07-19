import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ColorElement } from '../colors-types';
import { ColorLabel, ThemeName, lightTheme } from '@elvia/elvis-colors';
import { DropdownItem } from '@elvia/elvis-dropdown';
import { TokenSubCategory, TokenSubCategoryKeywords, TokenCategory } from './color-picker-header-types';
import { darkColors } from '../colors-dark';
import { lightColors } from '../colors-light';
@Component({
  selector: 'app-color-picker-header',
  templateUrl: './color-picker-header.component.html',
})
export class ColorPickerHeaderComponent implements OnChanges {
  @Input({ required: true }) readonly currentTheme: ThemeName = 'light';
  @Output() changeThemeEvent = new EventEmitter<ThemeName>();
  @Output() changeColorEvent = new EventEmitter<ColorElement>();

  //keywords that are used to filter out tokens that are not relevant for the dropdown level 1
  private readonly tokenKeywords: Readonly<Record<TokenSubCategory, readonly TokenSubCategoryKeywords[]>> = {
    states: ['disabled', 'hover', 'selected'],
    element: ['element'],
    overlay: ['overlay'],
  };

  isMobileScreenWidth = false;

  dropdownItems = this.generateDropdownItems();
  dropdownValue?: ColorLabel;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe(['(max-width: 768px)'])
      .pipe(takeUntilDestroyed())
      .subscribe((result) => {
        this.isMobileScreenWidth = result.matches;
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.currentTheme) {
      const theme = changes.currentTheme.currentValue as ThemeName;

      //If the user has selected a token beforehand during a theme change, we need to re-emit the event so that the correct color is shown
      if (this.dropdownValue) {
        this.emitChangeColorEvent(this.dropdownValue, theme);
      }
    }
  }

  private generateDropdownItems(): DropdownItem[] {
    const items: DropdownItem[] = Object.entries(lightTheme).map(([category, tokens]) => {
      const tokenCategory = category as TokenCategory;

      //second level with "default" tokens
      const children: DropdownItem[] = (Object.keys(tokens) as ColorLabel[])
        .filter((token) => !this.tokenIncludesReservedKeyword(token))
        .map((token) => ({
          label: token,
          value: token,
        }));

      //the third level with the special tokens
      for (const tokenSubCategory of Object.keys(this.tokenKeywords) as TokenSubCategory[]) {
        const grandChildren = this.getTokenGrandchildren(tokenSubCategory, tokenCategory);

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

  private getTokenGrandchildren(subCategory: TokenSubCategory, categoryToFilter: TokenCategory) {
    let result: DropdownItem | undefined;

    Object.entries(lightTheme).forEach(([category, tokens]) => {
      const tokenCategory = category as TokenCategory;

      //only find the tokens that are relevant for the dropdown level 3
      if (tokenCategory === categoryToFilter) {
        //ignore the "default" tokens
        const children = (Object.keys(tokens) as ColorLabel[]).filter((token) =>
          this.tokenKeywords[subCategory].some((keyword) => token.includes(keyword)),
        );

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
    const value = (event as CustomEvent<{ value: number }>).detail.value;
    this.changeThemeEvent.emit(value === 0 ? 'light' : 'dark');
  }

  handleDropdownChange(event: Event) {
    const value = (event as CustomEvent<{ value: ColorLabel }>).detail.value;
    this.dropdownValue = value;

    this.emitChangeColorEvent(value, this.currentTheme);
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
}
