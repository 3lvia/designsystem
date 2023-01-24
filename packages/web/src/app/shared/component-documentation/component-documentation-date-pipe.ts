import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'DocumentationDatePipe', standalone: true })
export class ComponentDocumentationDatePipe implements PipeTransform {
  transform(value: string): string {
    try {
      let date: Date;
      if (value.length === 8) {
        date = new Date(
          parseInt(value.substring(6, 8), 10) + 2000,
          parseInt(value.substring(3, 5), 10) - 1,
          parseInt(value.substring(0, 2), 10),
        );
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
      return value;
    }
  }
}
