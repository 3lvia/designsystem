import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ChangelogIdPipe', standalone: true })
export class ChangelogIdPipe implements PipeTransform {
  transform(date: string, version: string, change: string, type: string): string {
    return 'changelog-' + this.encodeHTML(`${type} ${date} v${version} ${change}`);
  }

  private encodeHTML(txt: string): string {
    return txt
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/&/g, '&amp;')
      .replace(/'/g, '&apos;')
      .replace(/"/g, '&quot;')
      .replace(/\s/g, '-');
  }
}
