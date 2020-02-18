import { Component, OnInit } from '@angular/core';

// @ts-ignore
require('../../../web-components/button/button.js');

@Component({
  selector: 'app-button-preview',
  templateUrl: './button-preview.component.html',
  styleUrls: ['./button-preview.component.scss']
})
export class ButtonPreviewComponent implements OnInit {

  public clicked = false;
  constructor() { }

  ngOnInit(): void {
  }

}
