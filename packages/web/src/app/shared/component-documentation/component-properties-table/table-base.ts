import { Directive, Input, OnChanges } from '@angular/core';
import { ComponentProp, EventProp, InputProp } from './types';
import { NestedProp } from 'src/app/doc-pages/components/component-data.interface';

interface TableGroup {
  title: string;
  expanded?: boolean;
  rows: (InputProp | EventProp)[];
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
        rows: this.getInputProps(this.props).sort(this.sortProps),
      },
      {
        title: 'Events',
        expanded: true,
        rows: this.getEventProps(this.props).sort(this.sortProps),
      },
    ];
  }

  getEventProps(props: ComponentProp[]): EventProp[] {
    return props.filter((prop) => this.propHasNoChildren(prop) && prop.isEvent) as EventProp[];
  }

  getInputProps(props: ComponentProp[]): InputProp[] {
    return props.filter((prop) => this.propHasNoChildren(prop) && !prop.isEvent) as InputProp[];
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
