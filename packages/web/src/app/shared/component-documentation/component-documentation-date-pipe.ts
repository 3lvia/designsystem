import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'DocumentationDatePipe', standalone: true })
export class ComponentDocumentationDatePipe implements PipeTransform {
  transform(value?: string): string {
    try {
      if (!value) {
        return '';
      }
      let date: Date;
      // Check if value is in format DD.MM.YY
      if (/\d\d\.\d\d\.\d\d/.test(value)) {
        const [day, month, year] = value.split('.');
        date = new Date(parseInt(year) + 2000, parseInt(month) - 1, parseInt(day));
      } else {
        date = new Date(value);
      }

      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      }).format(date);
    } catch (e) {
      console.warn(
        `"date": "${value}" in changelog is invalid. Should be "DD.MM.YY" or parsable by new Date()`,
      );
      return value ?? '';
    }
  }
}
