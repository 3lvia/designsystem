import { Directive, Input, OnChanges } from '@angular/core';
import { ComponentProp } from './types';
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

  private getEventProps(props: SearchResult<ComponentProp>[]): SearchResult<ComponentProp>[] {
    return props.filter((prop) => prop.item.isEvent);
  }

  private getInputProps(props: SearchResult<ComponentProp>[]): SearchResult<ComponentProp>[] {
    return props.filter((prop) => !prop.item.isEvent);
  }
}
