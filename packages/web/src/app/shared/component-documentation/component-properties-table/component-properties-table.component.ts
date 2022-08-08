import { Component, Input, OnInit } from '@angular/core';
import ComponentData, { AttributeType } from 'src/app/doc-pages/components/component-data.interface';

interface ComponentProp extends AttributeType {
  attribute: string;
}

@Component({
  selector: 'app-component-properties-table',
  templateUrl: './component-properties-table.component.html',
  styleUrls: ['./component-properties-table.component.scss'],
})
export class ComponentPropertiesTableComponent implements OnInit {
  @Input() componentData: ComponentData;
  componentProps: ComponentProp[] = [];

  ngOnInit(): void {
    this.createPropArray();
  }

  createPropArray(): void {
    Object.keys(this.componentData.attributes).forEach((attribute) => {
      const componentProp: ComponentProp = {
        attribute,
        ...this.componentData.attributes[attribute],
      };
      this.componentProps.push(componentProp);
    });
  }
}
