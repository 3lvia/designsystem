import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/elvis-items';

@Component({
  selector: 'app-badge-doc',
  templateUrl: './badge-doc.component.html',
  styleUrls: ['./badge-doc.component.scss']
})
export class BadgeDocComponent implements OnInit {

  componentStatus = getComponent('badge-doc').status;

  constructor() { }

  ngOnInit() {
  }
}
