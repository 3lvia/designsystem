import { Directive, Input, OnChanges } from '@angular/core';
import { ComponentProp, EventProp, InputProp } from './types';

interface TableGroup {
  title: string;
  expanded?: boolean;
  rows: ComponentProp[];
}

@Directive({ selector: '[appPropertyTableBase]' })
export class PropertyTableBaseDirective implements OnChanges {
  @Input() props: ComponentProp[] = [];
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

  getEventProps(props: ComponentProp[]): EventProp[] {
    return props.filter((prop) => prop.isEvent);
  }

  getInputProps(props: ComponentProp[]): InputProp[] {
    return props.filter((prop) => !prop.isEvent);
  }
}
