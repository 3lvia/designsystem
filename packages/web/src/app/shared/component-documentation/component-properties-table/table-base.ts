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
        rows: this.getInputProps(this.props),
      },
      {
        title: 'Events',
        expanded: true,
        rows: this.getEventProps(this.props),
      },
    ];
  }

  getEventProps(props: SearchResult<ComponentProp>[]): SearchResult<ComponentProp>[] {
    return props.filter((prop) => this.propHasNoChildren(prop.item) && prop.item.isEvent);
  }

  getInputProps(props: SearchResult<ComponentProp>[]): SearchResult<ComponentProp>[] {
    return props.filter(
      (prop) =>
        (this.propHasNoChildren(prop.item) && !prop.item.isEvent) || !this.propHasNoChildren(prop.item),
    );
  }

  propHasNoChildren(prop: ComponentProp): prop is EventProp | InputProp {
    return !(prop as NestedProp<Record<string, any>>).children;
  }
}
