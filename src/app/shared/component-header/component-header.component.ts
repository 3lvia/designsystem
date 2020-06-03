import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ItemStatus } from './../item-status.enum';

@Component({
  selector: 'app-component-header',
  templateUrl: './component-header.component.html',
  styleUrls: ['./component-header.component.scss']
})
export class ComponentHeaderComponent {

  @Input() componentStatus = '';
  @Input() tabs: string[];
  @Input() does = [];
  @Input() donts = [];
  @Input() selected: string;
  @Input() externalUrl: string;
  @Output() selectedChange = new EventEmitter();

  itemStatus = ItemStatus;

  chooseTab(tab: string): void {
    this.selected = tab;
    this.selectedChange.emit(this.selected);
  }

}
