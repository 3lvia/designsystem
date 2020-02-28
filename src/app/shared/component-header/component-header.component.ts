import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemStatus } from './../item-status.enum';

@Component({
  selector: 'app-component-header',
  templateUrl: './component-header.component.html',
  styleUrls: ['./component-header.component.scss']
})
export class ComponentHeaderComponent implements OnInit {

  @Input() componentStatus = '';
  @Input() componentClasses: string[];
  @Input() tabs: string[];
  @Input() selected: string;
  @Output() selectedChange = new EventEmitter();

  itemStatus = ItemStatus;

  constructor() { }

  ngOnInit() {
  }

  chooseTab(tab: string): void {
    this.selected = tab;
    this.selectedChange.emit(this.selected);
  }

}
