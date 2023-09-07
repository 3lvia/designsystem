import { Component, Input } from '@angular/core';
import { ComponentProp } from '../types';

@Component({
  selector: 'app-property-table-mobile',
  templateUrl: './property-table-mobile.component.html',
})
export class PropertyTableMobileComponent {
  @Input() props: ComponentProp[] = [];
}
