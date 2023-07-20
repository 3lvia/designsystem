import { Pipe, PipeTransform } from '@angular/core';

/**
 * Replaces all occurrences of a string with another string.
 * @param value The original string.
 * @param pattern The string to replace.
 * @param replacement The string to replace with.
 * @returns The replaced string.
 */
@Pipe({
  name: 'replace',
})
export class ReplacePipe implements PipeTransform {
  transform(value: string, pattern: string, replacement: string) {
    const escapedString = this.escapeString(pattern);
    const regex = new RegExp(escapedString, 'g');

    return value.replace(regex, replacement);
  }

  private escapeString(string: string): string {
    return string.replace(/[-/^$*+?.()|[]{}]/g, '$&');
  }
}
