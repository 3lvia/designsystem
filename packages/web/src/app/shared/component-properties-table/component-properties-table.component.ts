import { Component, Input, OnInit } from '@angular/core';
import { ComponentProp } from './../component-prop.interface';

@Component({
  selector: 'app-component-properties-table',
  templateUrl: './component-properties-table.component.html',
  styleUrls: ['./component-properties-table.component.scss'],
})
export class ComponentPropertiesTableComponent implements OnInit {
  @Input() componentProps: ComponentProp[];

  ngOnInit(): void {
    console.log(this.componentProps[0]);
  }
}
