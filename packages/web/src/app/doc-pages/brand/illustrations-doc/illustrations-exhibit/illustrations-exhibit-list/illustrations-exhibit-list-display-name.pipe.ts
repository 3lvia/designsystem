import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'illustrationsExhibitListDisplayName',
  standalone: true,
})
export class IllustrationsExhibitListDisplayNamePipe implements PipeTransform {
  transform(value: string): string {
    // Capitalize first word and replace - with space
    return value
      .split('-')
      .map((word, i) => (i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
      .join(' ');
  }
}
