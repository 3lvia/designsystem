import { Directive, Input, OnChanges } from '@angular/core';
import { ComponentProp, EventProp, InputProp, PropWithMatches } from './types';
import { NestedProp } from 'src/app/doc-pages/components/component-data.interface';

interface TableGroup {
  title: string;
  expanded?: boolean;
  rows: PropWithMatches[];
}

@Directive({ selector: '[appPropertyTableBase]' })
export class PropertyTableBaseDirective implements OnChanges {
  @Input() props: PropWithMatches[] = [];
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

  getEventProps(props: PropWithMatches[]): PropWithMatches[] {
    return props.filter(
      (prop) => this.propHasNoChildren(prop.value) && prop.value.isEvent,
    ) as PropWithMatches[];
  }

  getInputProps(props: PropWithMatches[]): PropWithMatches[] {
    return props.filter(
      (prop) => this.propHasNoChildren(prop.value) && !prop.value.isEvent,
    ) as PropWithMatches[];
  }

  propHasNoChildren(prop: ComponentProp): prop is EventProp | InputProp {
    return !(prop as NestedProp<Record<string, any>>).children;
  }
}
