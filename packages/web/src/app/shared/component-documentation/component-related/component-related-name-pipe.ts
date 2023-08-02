import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ComponentRelatedNamePipe' })
export class ComponentRelatedNamePipe implements PipeTransform {
  transform(name?: string): string {
    try {
      if (!name) {
        return '';
      }
      const formattedName = name.split(' ').join('-').toLowerCase();
      return formattedName;
    } catch (e) {
      console.warn(`"name": "${name}" in Related section is invalid.`);
      return name ?? '';
    }
  }
}
