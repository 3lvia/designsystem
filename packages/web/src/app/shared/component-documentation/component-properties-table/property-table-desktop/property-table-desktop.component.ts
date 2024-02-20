import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';

import { EscapeHTMLPipe } from '../../../pipes/escape-html.pipe';
import { SearchHighlighterPipe } from '../../../search-highlighter.pipe';
import { PropertyExamplePopoverComponent } from '../property-example-popover/property-example-popover.component';
import { PropertyTableBaseDirective } from '../table-base';
import { ComponentProp } from '../types';
import { SearchResult } from 'src/app/shared/searcher';

@Component({
  selector: 'app-property-table-desktop',
  templateUrl: './property-table-desktop.component.html',
  styleUrls: ['./property-table-desktop.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    NgStyle,
    PropertyExamplePopoverComponent,
    SearchHighlighterPipe,
    EscapeHTMLPipe,
  ],
})
export class PropertyTableDesktopComponent extends PropertyTableBaseDirective {
  calculateMargin(i: number, propList: SearchResult<ComponentProp>[]) {
    const level = propList[i].item.level;
    return level === 0 ? 0 : 32 * (level + 1);
  }

  calculatePadding(i: number, propList: SearchResult<ComponentProp>[]) {
    const level = propList[i].item.level;
    return level === 0 ? 8 : 0;
  }

  isLeafProp(i: number, propList: SearchResult<ComponentProp>[]) {
    if (i === propList.length - 1) {
      return true;
    }
    if (propList[i].item.level < propList[i + 1].item.level) {
      return false;
    }
    return true;
  }
}
