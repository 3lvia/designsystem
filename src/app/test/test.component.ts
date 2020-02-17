import { Component, OnInit } from '@angular/core';

// @ts-ignore
require('../../web-components/components.js');

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
