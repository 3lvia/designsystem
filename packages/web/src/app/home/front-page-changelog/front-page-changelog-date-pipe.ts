import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'FrontPageChangelogDatePipe', standalone: true })
export class FrontPageChangelogDatePipe implements PipeTransform {
  transform(date?: Date): string {
    try {
      if (!date) {
        return '';
      }
      return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: '2-digit',
      }).format(date);
    } catch (e) {
      console.warn(
        `"date": "${date}" in changelog is invalid. Should be "DD.MM.YY" or parsable by new Date()`,
      );
      return date?.toDateString() ?? '';
    }
  }
}
