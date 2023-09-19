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

  getEventProps(props: SearchResult<ComponentProp>[]): SearchResult<ComponentProp>[] {
    return props.filter((prop) => this.propHasNoChildren(prop.item) && prop.item.isEvent);
  }

  getInputProps(props: SearchResult<ComponentProp>[]): SearchResult<ComponentProp>[] {
    return props.filter((prop) => this.propHasNoChildren(prop.item) && !prop.item.isEvent);
  }

  propHasNoChildren(prop: ComponentProp): prop is EventProp | InputProp {
    return !(prop as NestedProp<Record<string, any>>).children;
  }

  private sortProps(a: InputProp | EventProp, b: InputProp | EventProp): number {
    if (['className', 'inlineStyle'].includes(a.attribute)) {
      return 1;
    }

    let requiredComparison = 0;
    if (a.isRequired && !b.isRequired) {
      requiredComparison = -1;
    } else if (!a.isRequired && b.isRequired) {
      requiredComparison = 1;
    }

    const alphabeticalComparison = a.attribute.localeCompare(b.attribute);

    return requiredComparison || alphabeticalComparison;
  }
}
