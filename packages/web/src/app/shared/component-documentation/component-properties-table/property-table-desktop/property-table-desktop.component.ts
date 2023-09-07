import { Component, Input, OnChanges } from '@angular/core';
import { ComponentProp } from '../types';
import { getEventProps, getInputProps } from '../table-utils';

interface TableGroup {
  title: string;
  expanded?: boolean;
  rows: ComponentProp[];
}

@Component({
  selector: 'app-property-table-desktop',
  templateUrl: './property-table-desktop.component.html',
  styleUrls: ['./property-table-desktop.component.scss'],
})
export class PropertyTableDesktopComponent implements OnChanges {
  @Input() props: ComponentProp[] = [];
  groupedProps: TableGroup[] = [];

  ngOnChanges(): void {
    this.groupedProps = [
      {
        title: 'Properties',
        expanded: true,
        rows: getInputProps(this.props),
      },
      {
        title: 'Events',
        expanded: true,
        rows: getEventProps(this.props),
      },
    ];
  }
}
