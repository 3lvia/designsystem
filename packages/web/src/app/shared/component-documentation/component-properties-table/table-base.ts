import { Directive, Input, OnChanges } from '@angular/core';
import { ComponentProp } from './types';
import { SearchResult } from '../../searcher';

type Section = 'Properties' | 'Events' | 'Arguments';

interface TableGroup {
  title: Section;
  description: string;
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
        description: "Use properties to customize the component's behavior and look.",
        expanded: true,
        rows: this.getInputProps(this.props),
      },
      {
        title: 'Events',
        description: 'Events let the component communicate with your app, notifying it of changes.',
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
