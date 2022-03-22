import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ChangelogTypePipe' })
export class ChangelogTypePipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'new_feature':
        return '💥 New Features';
      case 'bug_fix':
        return '🐝 Bug Fixes';
      case 'patch':
        return '🛠 Patch';
      case 'breaking_changes':
        return '✂️ Breaking Changes';
      default:
        return '';
    }
  }
}
