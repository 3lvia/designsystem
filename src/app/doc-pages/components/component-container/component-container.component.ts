import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-component-container',
  templateUrl: './component-container.component.html',
  styleUrls: ['./component-container.component.scss']
})
export class ComponentContainerComponent implements OnInit {

  @Input() componentStatus = '';
  @Input() numberOfExamples = 0;

  constructor() { }

  ngOnInit() {
  }

}
