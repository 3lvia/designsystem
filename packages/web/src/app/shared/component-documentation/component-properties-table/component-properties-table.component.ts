import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-properties-table',
  templateUrl: './component-properties-table.component.html',
  styleUrls: ['./component-properties-table.component.scss'],
})
export class ComponentPropertiesTableComponent implements OnInit {
  @Input() componentData;
  componentProps = [];

  ngOnInit(): void {
    this.createPropArray();
  }

  createPropArray(): void {
    Object.keys(this.componentData.attributes).forEach((attribute) => {
      const newObject = {
        attribute,
        ...this.componentData.attributes[attribute],
      };
      this.componentProps.push(newObject);
    });
  }
}
