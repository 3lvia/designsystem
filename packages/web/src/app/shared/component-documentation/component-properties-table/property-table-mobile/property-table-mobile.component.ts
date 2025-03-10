import { Component, computed } from '@angular/core';

import { EscapeHTMLPipe } from '../../../pipes/escape-html.pipe';
import { SearchHighlighterPipe } from '../../../search-highlighter.pipe';
import { PropertyExamplePopoverComponent } from '../property-example-popover/property-example-popover.component';
import { PropertyTableBaseDirective } from '../table-base';
import { ComponentProp } from '../types';
import { SearchResult } from 'src/app/shared/searcher';

@Component({
  selector: 'app-property-table-mobile',
  templateUrl: './property-table-mobile.component.html',
  imports: [PropertyExamplePopoverComponent, SearchHighlighterPipe, EscapeHTMLPipe],
})
export class PropertyTableMobileComponent extends PropertyTableBaseDirective {
  itemsWithoutChildren = computed<SearchResult<ComponentProp>[]>(() =>
    this.props().filter((prop) => prop.item.level === 0),
  );
}
