import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'FrontPageChangelogNamePipe' })
export class FrontPageChangelogNamePipe implements PipeTransform {
  transform(name?: string): string {
    try {
      if (!name) {
        return '';
      }
      if (name === 'elvis') {
        return name;
      }
      const formattedName = name.split('-').slice(1).join(' ');
      return formattedName;
    } catch (e) {
      console.warn(`"name": "${name}" in changelog is invalid. Should be "elvis-(name)" or "elvis"`);
      return name ?? '';
    }
  }
}
