import { Component } from '@angular/core';
import { PropertyTableBaseDirective } from '../table-base';
import { SearchResult } from 'src/app/shared/searcher';
import { ComponentProp } from '../types';

@Component({
  selector: 'app-property-table-desktop',
  templateUrl: './property-table-desktop.component.html',
  styleUrls: ['./property-table-desktop.component.scss'],
})
export class PropertyTableDesktopComponent extends PropertyTableBaseDirective {
  calculateMargin(i: number, propList: SearchResult<ComponentProp>[]) {
    const level = propList[i].item.level;
    if (level === 0) {
      return 0;
    }
    if (this.isLastChild(i, propList)) {
      if (level === 1) {
        return 0;
      }
      return 16 + 24 * (level - 1);
    }
    return 16 + 24 * level;
  }

  calculatePadding(i: number, propList: SearchResult<ComponentProp>[]) {
    const level = propList[i].item.level;
    if (level === 0) {
      return 16;
    }
    if (this.isLastChild(i, propList)) {
      if (level === 1) {
        return 40;
      }
      return 24;
    }
    return 0;
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

  private isLastChild(i: number, propList: SearchResult<ComponentProp>[]) {
    if (i === propList.length - 1) {
      return true;
    }
    if (propList[i].item.level > propList[i + 1].item.level) {
      return true;
    }
    return false;
  }
}
