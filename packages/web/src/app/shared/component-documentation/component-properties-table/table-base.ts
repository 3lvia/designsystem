import { Directive, Input, OnChanges } from '@angular/core';

import { SearchResult } from '../../searcher';
import { ComponentProp } from './types';

interface TableGroup {
  title: string;
  expanded?: boolean;
  rows: SearchResult<ComponentProp>[];
  description: string;
}

@Directive({
  selector: '[appPropertyTableBase]',
  standalone: true,
})
export class PropertyTableBaseDirective implements OnChanges {
  @Input() props: SearchResult<ComponentProp>[] = [];
  groupedProps: TableGroup[] = [];

  ngOnChanges(): void {
    this.groupedProps = [
      {
        title: 'Properties',
        expanded: true,
        rows: this.getInputProps(this.props),
        description: "Properties can be used to customise the component's behaviour and appearance.",
      },
      {
        title: 'Events',
        expanded: true,
        rows: this.getEventProps(this.props),
        description: 'Events let the component communicate with your app, notifying it of changes.',
      },
      {
        title: 'Functions',
        expanded: true,
        rows: this.getFunctionProps(this.props),
        description:
          'Functions can be imported separately from the component, and can sometimes \nbe required for the component to work.',
      },
    ];
  }

  private getEventProps(props: SearchResult<ComponentProp>[]): SearchResult<ComponentProp>[] {
    return props.filter((prop) => prop.item.specialType === 'event');
  }

  private getInputProps(props: SearchResult<ComponentProp>[]): SearchResult<ComponentProp>[] {
    return props.filter((prop) => prop.item.specialType !== 'event' && prop.item.specialType !== 'function');
  }

  private getFunctionProps(props: SearchResult<ComponentProp>[]): SearchResult<ComponentProp>[] {
    return props.filter((prop) => prop.item.specialType === 'function');
  }
}
