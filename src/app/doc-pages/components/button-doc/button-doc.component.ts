import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/elvis-items';

// @ts-ignore
require('../../../../../web-components/button/button.js');

@Component({
  selector: 'app-button-doc',
  templateUrl: './button-doc.component.html',
  styleUrls: ['./button-doc.component.scss']
})
export class ButtonDocComponent implements OnInit {

  componentStatus = getComponent('button-doc').status;
  public clicked = false;
  constructor() { }

  ngOnInit() {
  }

}
