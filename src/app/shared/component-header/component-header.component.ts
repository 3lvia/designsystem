import { Component, OnInit, Input } from '@angular/core';
import { ItemStatus } from './../item-status.enum';

@Component({
  selector: 'app-component-header',
  templateUrl: './component-header.component.html',
  styleUrls: ['./component-header.component.scss']
})
export class ComponentHeaderComponent implements OnInit {

  @Input() componentStatus = '';
  @Input() componentClasses: string[];

  itemStatus = ItemStatus;

  constructor() { }

  ngOnInit() {
  }

}
