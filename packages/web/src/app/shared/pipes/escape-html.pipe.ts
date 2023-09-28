import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'escapeHTML',
})
export class EscapeHTMLPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) return '';
    const escapeMap: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&#34;',
    };

    return value.replace(/[&<>"]/g, (match) => escapeMap[match]);
  }
}
