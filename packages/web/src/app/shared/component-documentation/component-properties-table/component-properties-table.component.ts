import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, booleanAttribute } from '@angular/core';

import { SearchResult, Searcher } from '../../searcher';
import { PropertySearchInputComponent } from './property-search-input/property-search-input.component';
import { PropertyTableDesktopComponent } from './property-table-desktop/property-table-desktop.component';
import { PropertyTableMobileComponent } from './property-table-mobile/property-table-mobile.component';
import { ComponentProp } from './types';
import ComponentData, { NestedProp } from 'src/app/doc-pages/components/component-data.interface';

@Component({
  selector: 'app-component-properties-table',
  templateUrl: './component-properties-table.component.html',
  styleUrls: ['./component-properties-table.component.scss'],
  imports: [PropertySearchInputComponent, PropertyTableDesktopComponent, PropertyTableMobileComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentPropertiesTableComponent implements OnInit {
  @Input() componentData: ComponentData;
  @Input({ transform: booleanAttribute }) ignoreDefaultProps: boolean;
  filteredComponentProps: SearchResult<ComponentProp>[] = [];

  private searcher: Searcher<ComponentProp>;

  ngOnInit(): void {
    this.searcher = new Searcher(this.getRootPropArray(), {
      threshold: 0.4,
      includeMatches: true,
      keys: [
        { name: 'attribute', weight: 1 },
        { name: 'description', weight: 0.5 },
        { name: 'type', weight: 0.4 },
        { name: 'default', weight: 0.01 },
      ],
    });
    this.searchProps('');
  }

  searchProps(searchTerm: string): void {
    if (searchTerm !== '') {
      this.filteredComponentProps = this.searcher.search(searchTerm);
    } else {
      this.filteredComponentProps = this.getRootPropArray().map((prop) => ({ item: prop }));
    }
    this.filteredComponentProps = this.flattenProps(this.filteredComponentProps);
  }

  private flattenProps(componentProps: SearchResult<ComponentProp>[]): SearchResult<ComponentProp>[] {
    let flatComponentProps: SearchResult<ComponentProp>[] = [];

    for (const prop of componentProps) {
      flatComponentProps.push(prop);
      const propData = this.componentData.attributes[prop.item.attribute];
      if (propData && 'children' in propData) {
        flatComponentProps = this.flattenPropsRecursive(propData, 1, flatComponentProps);
      }
    }
    return flatComponentProps;
  }

  private flattenPropsRecursive(
    nestedComponentProp: NestedProp<any>,
    level: number,
    componentProps: SearchResult<ComponentProp>[],
  ): SearchResult<ComponentProp>[] {
    for (const prop in nestedComponentProp.children) {
      const propData = nestedComponentProp.children[prop];
      const componentProp: ComponentProp = {
        attribute: prop,
        ...propData,
        description: propData.description || '',
        specialType: nestedComponentProp.specialType,
        level,
      };
      componentProps.push({ item: componentProp });
      if ('children' in propData) {
        componentProps = this.flattenPropsRecursive(propData, level + 1, componentProps);
      }
    }
    return componentProps;
  }

  private getRootPropArray(): ComponentProp[] {
    const componentProps: ComponentProp[] = Object.keys(this.componentData.attributes).map((prop) => {
      const propData = this.componentData.attributes[prop];
      return {
        attribute: prop,
        ...propData,
        description: propData.description || '',
        level: 0,
      };
    });

    componentProps.sort(this.sortProps);

    if (!this.ignoreDefaultProps) {
      componentProps.push(...this.getCommonProps());
    }
    return componentProps;
  }

  private sortProps(a: ComponentProp, b: ComponentProp): number {
    const lastProps = ['className', 'inlineStyle'];
    let lastPropComparison = 0;
    if (lastProps.includes(a.attribute) && !lastProps.includes(b.attribute)) {
      lastPropComparison = 1;
    } else if (!lastProps.includes(a.attribute) && lastProps.includes(b.attribute)) {
      lastPropComparison = -1;
    }

    let requiredComparison = 0;
    if (a.isRequired && !b.isRequired) {
      requiredComparison = -1;
    } else if (!a.isRequired && b.isRequired) {
      requiredComparison = 1;
    }

    const alphabeticalComparison = a.attribute.localeCompare(b.attribute);

    return lastPropComparison || requiredComparison || alphabeticalComparison;
  }

  private getCommonProps(): ComponentProp[] {
    return [
      {
        attribute: 'className',
        description: 'Custom CSS classes that can be added to the component.',
        type: 'string',
        level: 0,
      },
      {
        attribute: 'inlineStyle',
        description: 'Custom CSS style object that can be added to the component.',
        type: '{[cssProperty: string]: string}',
        level: 0,
        example: /* ts */ `inlineStyle = { marginTop: "8px" }`,
      },
    ];
  }
}
