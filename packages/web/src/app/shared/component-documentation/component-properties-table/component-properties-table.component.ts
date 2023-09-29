import { Component, Input, OnInit, booleanAttribute } from '@angular/core';
import ComponentData, {
  ChildlessProp,
  NestedProp,
} from 'src/app/doc-pages/components/component-data.interface';
import { ComponentProp, NestedInputProp } from './types';
import { SearchResult, Searcher } from '../../searcher';

@Component({
  selector: 'app-component-properties-table',
  templateUrl: './component-properties-table.component.html',
  styleUrls: ['./component-properties-table.component.scss'],
})
export class ComponentPropertiesTableComponent implements OnInit {
  @Input() componentData: ComponentData;
  @Input({ transform: booleanAttribute }) ignoreDefaultProps: boolean;
  filteredComponentProps: SearchResult<ComponentProp>[] = [];

  private searcher: Searcher<ComponentProp>;

  ngOnInit(): void {
    this.searcher = new Searcher(this.getPropArray(), {
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
      this.filteredComponentProps = this.getPropArray().map((prop) => ({ item: prop }));
    }
  }

  private getPropArrayRecursive(
    nestedComponentProp: NestedProp<any>,
    level: number,
    componentProps: ComponentProp[],
  ): ComponentProp[] {
    Object.keys(nestedComponentProp.children).forEach((prop) => {
      const propData = nestedComponentProp.children[prop];
      const componentProp: ComponentProp = {
        attribute: prop,
        ...propData,
        description: propData.description ?? '',
        level: level,
      };
      componentProps.push(componentProp);
      if ('children' in componentProp) {
        componentProps = this.getPropArrayRecursive(componentProp, level + 1, componentProps);
      }
    });
    return componentProps;
  }

  private getPropArray(): ComponentProp[] {
    let componentProps: ComponentProp[] = [];

    Object.keys(this.componentData.attributes).forEach((prop) => {
      const propData = this.componentData.attributes[prop];
      const componentProp: ComponentProp = {
        attribute: prop,
        ...propData,
        description: propData.description ?? '',
        level: 0,
      };
      componentProps.push(componentProp);
    });

    componentProps = componentProps.sort(this.sortProps);
    let componentPropsWithChildren: ComponentProp[] = [];

    Object.keys(componentProps).forEach((_, i) => {
      const propData = componentProps[i];
      componentPropsWithChildren.push(propData);
      if ('children' in propData) {
        componentPropsWithChildren = this.getPropArrayRecursive(propData, 1, componentPropsWithChildren);
      }
    });

    if (!this.ignoreDefaultProps) {
      componentPropsWithChildren.push(...this.getCommonProps());
    }
    return componentPropsWithChildren;
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
        description:
          "Custom CSS style object that can be added to the component. Example: {marginTop: '8px'}",
        type: '{[cssProperty: string]: string}',
        level: 0,
      },
    ];
  }
}
