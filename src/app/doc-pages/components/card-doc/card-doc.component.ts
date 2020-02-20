import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/elvis-items';

@Component({
  selector: 'app-card-doc',
  templateUrl: './card-doc.component.html',
  styleUrls: ['./card-doc.component.scss']
})
export class CardDocComponent implements OnInit {

  componentStatus = getComponent('card-doc').status;

  constructor() { }

  ngOnInit() {
  }

}
