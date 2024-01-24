import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ChangelogTypePipe', standalone: true })
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
        console.warn(
          `"type": "${value}" in changelog is invalid. Should be "new_feature", "bug_fix", "patch" or "breaking_changes"`,
        );
        return '';
    }
  }
}
