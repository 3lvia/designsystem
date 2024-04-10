import { Pipe, PipeTransform } from '@angular/core';
import { DarkThemeColorName, LightThemeColorName, ThemeName } from '@elvia/elvis-colors';

@Pipe({
  name: 'needsBorder',
  standalone: true,
})
export class NeedsBorderPipe implements PipeTransform {
  transform(colorName: LightThemeColorName | DarkThemeColorName, theme: ThemeName): boolean {
    const lightThemeColors: LightThemeColorName[] = ['white', 'grey-02', 'grey-05', 'grey-10'];
    const darkThemeColors: DarkThemeColorName[] = ['black', 'grey', 'grey-70', 'grey-60', 'grey-50'];

    return (
      (theme === 'light' && lightThemeColors.includes(colorName)) ||
      (theme === 'dark' && darkThemeColors.includes(colorName as DarkThemeColorName))
    );
  }
}
