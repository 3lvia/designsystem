import { Component, OnInit } from '@angular/core';


// @ts-ignore
require('../../../../../web-components/button/button.js');

@Component({
  selector: 'app-button-doc',
  templateUrl: './button-doc.component.html',
  styleUrls: ['./button-doc.component.scss']
})
export class ButtonDocComponent implements OnInit {

  public clicked = false;
  constructor() { }

  ngOnInit() {
  }

}
