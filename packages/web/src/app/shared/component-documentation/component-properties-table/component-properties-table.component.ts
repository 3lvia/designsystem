import { Component, Input, OnInit, booleanAttribute } from '@angular/core';
import ComponentData from 'src/app/doc-pages/components/component-data.interface';
import { ComponentProp } from './types';
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

  private getPropArray(): ComponentProp[] {
    const componentProps: ComponentProp[] = [];
    Object.keys(this.componentData.attributes).forEach((prop) => {
      const propData = this.componentData.attributes[prop];
      const componentProp: ComponentProp = {
        attribute: prop,
        ...propData,
        description: propData.description ?? '',
      };
      componentProps.push(componentProp);
    });

    if (!this.ignoreDefaultProps) {
      componentProps.push(...this.getCommonProps());
    }

    return componentProps;
  }

  private getCommonProps(): ComponentProp[] {
    return [
      {
        attribute: 'className',
        description: 'Custom CSS classes that can be added to the component.',
        type: 'string',
      },
      {
        attribute: 'inlineStyle',
        description: 'Custom CSS style object that can be added to the component.',
        type: '{[cssProperty: string]: string}',
        example: 'inlineStyle = {marginTop: "8px"}',
      },
    ];
  }
}
