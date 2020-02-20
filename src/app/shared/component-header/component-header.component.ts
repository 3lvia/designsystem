import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-component-header',
  templateUrl: './component-header.component.html',
  styleUrls: ['./component-header.component.scss']
})
export class ComponentHeaderComponent implements OnInit {

  @Input() componentStatus = '';

  constructor() { }

  ngOnInit() {
  }

}
