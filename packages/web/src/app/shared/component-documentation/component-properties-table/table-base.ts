import { Directive, Input, OnChanges } from '@angular/core';
import { ComponentProp, EventProp, InputProp } from './types';
import { NestedProp } from 'src/app/doc-pages/components/component-data.interface';
import { SearchResult } from '../../searcher';

interface TableGroup {
  title: string;
  expanded?: boolean;
  rows: SearchResult<ComponentProp>[];
}

@Directive({ selector: '[appPropertyTableBase]' })
export class PropertyTableBaseDirective implements OnChanges {
  @Input() props: SearchResult<ComponentProp>[] = [];
  groupedProps: TableGroup[] = [];

  ngOnChanges(): void {
    this.groupedProps = [
      {
        title: 'Properties',
        expanded: true,
        rows: this.getInputProps(this.props).sort(this.sortProps),
      },
      {
        title: 'Events',
        expanded: true,
        rows: this.getEventProps(this.props).sort(this.sortProps),
      },
    ];
  }

  propHasNoChildren(prop: ComponentProp): prop is EventProp | InputProp {
    return !(prop as NestedProp<Record<string, any>>).children;
  }

  private getEventProps(props: SearchResult<ComponentProp>[]): SearchResult<ComponentProp>[] {
    return props.filter((prop) => this.propHasNoChildren(prop.item) && prop.item.isEvent);
  }

  private getInputProps(props: SearchResult<ComponentProp>[]): SearchResult<ComponentProp>[] {
    return props.filter((prop) => this.propHasNoChildren(prop.item) && !prop.item.isEvent);
  }

  private sortProps(a: SearchResult<ComponentProp>, b: SearchResult<ComponentProp>): number {
    const lastProps = ['className', 'inlineStyle'];
    let lastPropComparison = 0;
    if (lastProps.includes(a.item.attribute) && !lastProps.includes(b.item.attribute)) {
      lastPropComparison = 1;
    } else if (!lastProps.includes(a.item.attribute) && lastProps.includes(b.item.attribute)) {
      lastPropComparison = -1;
    }

    let requiredComparison = 0;
    if (a.item.isRequired && !b.item.isRequired) {
      requiredComparison = -1;
    } else if (!a.item.isRequired && b.item.isRequired) {
      requiredComparison = 1;
    }

    const alphabeticalComparison = a.item.attribute.localeCompare(b.item.attribute);

    return lastPropComparison || requiredComparison || alphabeticalComparison;
  }
}
