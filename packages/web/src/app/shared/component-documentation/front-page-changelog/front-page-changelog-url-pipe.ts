import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'FrontPageChangelogUrlPipe' })
export class FrontPageChangelogUrlPipe implements PipeTransform {
  transform(name?: string): string {
    try {
      if (!name) {
        return 'https://design.elvia.io/';
      }
      if (name === 'elvis') {
        return 'https://design.elvia.io/about/whats-new';
      }
      const formattedUrl = 'https://design.elvia.io/components/' + name.split('-').slice(1).join('-');
      return formattedUrl;
    } catch (e) {
      console.warn(`"name": "${name}" in changelog is invalid. Should be "elvis-(name)" or "elvis"`);
      return 'https://design.elvia.io/';
    }
  }
}
