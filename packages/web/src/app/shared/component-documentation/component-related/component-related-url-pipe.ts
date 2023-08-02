import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ComponentRelatedUrlPipe' })
export class ComponentRelatedUrlPipe implements PipeTransform {
  transform(name?: string): string {
    try {
      if (!name) {
        return '';
      }
      const formattedUrl = '/components/' + name.split(' ').join('-').toLowerCase();
      return formattedUrl;
    } catch (e) {
      console.warn(`"name": "${name}" in Related section is invalid.`);
      return '';
    }
  }
}
