import { Component } from '@angular/core';
import { PropertyTableBaseDirective } from '../table-base';

@Component({
  selector: 'app-property-table-desktop',
  templateUrl: './property-table-desktop.component.html',
  styleUrls: ['./property-table-desktop.component.scss'],
})
export class PropertyTableDesktopComponent extends PropertyTableBaseDirective {
  calculateMargin(level: number, isLast?: boolean) {
    if (isLast) {
      if (level === 1) {
        return 0;
      }
      return 16 + 24 * (level - 1);
    }
    return 16 + 24 * level;
  }

  calculatePadding(level: number, isLast?: boolean) {
    if (isLast) {
      if (level === 1) {
        return 40;
      }
      return 24;
    }
    return 0;
  }
}
