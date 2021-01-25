import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fontWeight',
})
export class FontWeightPipe implements PipeTransform {
  transform(fontWeight: string): string {
    switch (fontWeight) {
      case '900': {
        return 'Black';
        break;
      }
      case '700': {
        return 'Bold';
        break;
      }
      case '500': {
        return 'Medium';
        break;
      }
      case '400': {
        return 'Regular';
        break;
      }
    }
  }
}
