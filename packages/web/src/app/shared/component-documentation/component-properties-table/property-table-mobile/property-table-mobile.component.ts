import { Component } from '@angular/core';
import { PropertyTableBaseDirective } from '../table-base';
import { ComponentProp } from '../types';
import { SearchResult } from 'src/app/shared/searcher';

@Component({
  selector: 'app-property-table-mobile',
  templateUrl: './property-table-mobile.component.html',
})
export class PropertyTableMobileComponent extends PropertyTableBaseDirective {
  get itemsWithoutChildren(): SearchResult<ComponentProp>[] {
    return this.props.filter((prop) => prop.item.level === 0);
  }
}
