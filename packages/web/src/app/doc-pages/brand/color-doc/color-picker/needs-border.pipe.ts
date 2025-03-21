import { Pipe, PipeTransform } from '@angular/core';
import { DarkThemeColorName, LightThemeColorName, ThemeName } from '@elvia/elvis-colors';

@Pipe({
  name: 'needsBorder',
})
export class NeedsBorderPipe implements PipeTransform {
  transform(colorName: LightThemeColorName | DarkThemeColorName | undefined, theme: ThemeName): boolean {
    const lightThemeColors: LightThemeColorName[] = ['white', 'grey-02', 'grey-05', 'grey-10'];
    const darkThemeColors: DarkThemeColorName[] = ['black', 'grey', 'grey-70', 'grey-60', 'grey-50'];

    return (
      (theme === 'light' && !!colorName && lightThemeColors.includes(colorName)) ||
      (theme === 'dark' && !!colorName && darkThemeColors.includes(colorName as DarkThemeColorName))
    );
  }
}
