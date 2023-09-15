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
        rows: this.getInputProps(this.props).concat(...this.getCommonProps()),
      },
      {
        title: 'Events',
        expanded: true,
        rows: this.getEventProps(this.props),
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

  private getCommonProps(): InputProp[] {
    return [
      {
        attribute: 'className',
        description: 'Custom CSS classes that can be added to the component.',
        type: 'string',
      },
      {
        attribute: 'inlineStyle',
        description:
          "Custom CSS style object that can be added to the component. Example: {marginTop: '8px'}",
        type: '{[cssProperty: string]: string}',
      },
    ];
  }
}
