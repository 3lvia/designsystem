import { Component } from '@angular/core';
import { PropertyTableBaseDirective } from '../table-base';

@Component({
  selector: 'app-property-table-desktop',
  templateUrl: './property-table-desktop.component.html',
  styleUrls: ['./property-table-desktop.component.scss'],
})
export class PropertyTableDesktopComponent extends PropertyTableBaseDirective {
  calculateMargin(level: number) {
    return 16 + 24 * level;
  }
}
