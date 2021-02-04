import { Component, Input } from '@angular/core';
import { ComponentProp } from '../../component-prop.interface';

@Component({
  selector: 'app-component-properties-table',
  templateUrl: './component-properties-table.component.html',
  styleUrls: ['./component-properties-table.component.scss'],
})
export class ComponentPropertiesTableComponent {
  @Input() componentProps: ComponentProp[];
}
