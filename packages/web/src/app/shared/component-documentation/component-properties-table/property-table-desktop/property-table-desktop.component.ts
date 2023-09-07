import { Component, Input } from '@angular/core';
import { ComponentProp } from '../types';

@Component({
  selector: 'app-property-table-desktop',
  templateUrl: './property-table-desktop.component.html',
  styleUrls: ['./property-table-desktop.component.scss'],
})
export class PropertyTableDesktopComponent {
  @Input() props: ComponentProp[] = [];
}
