import { Component } from '@angular/core';
import { PropertyTableBaseDirective } from '../table-base';
import { ComponentProp } from '../types';
import { SearchResult } from 'src/app/shared/searcher';
import { EscapeHTMLPipe } from '../../../pipes/escape-html.pipe';
import { SearchHighlighterPipe } from '../../../search-highlighter.pipe';
import { PropertyExamplePopoverComponent } from '../property-example-popover/property-example-popover.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-property-table-mobile',
    templateUrl: './property-table-mobile.component.html',
    standalone: true,
    imports: [
        NgFor,
        NgIf,
        PropertyExamplePopoverComponent,
        SearchHighlighterPipe,
        EscapeHTMLPipe,
    ],
})
export class PropertyTableMobileComponent extends PropertyTableBaseDirective {
  get itemsWithoutChildren(): SearchResult<ComponentProp>[] {
    return this.props.filter((prop) => prop.item.level === 0);
  }
}
