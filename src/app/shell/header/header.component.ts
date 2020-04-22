import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // @ts-ignore
  version = require('../../../../style/elvis/package.json').version;
  constructor() { }

  ngOnInit() {
  }

  

}
