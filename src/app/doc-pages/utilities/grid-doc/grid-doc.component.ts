import { Component, OnInit } from '@angular/core';
import { getUtilities } from 'src/app/shared/e-items';

@Component({
  selector: 'app-grid-doc',
  templateUrl: './grid-doc.component.html',
  styleUrls: ['./grid-doc.component.scss']
})
export class GridDocComponent implements OnInit {

  componentStatus = getUtilities('grid-doc').status;
  elements = ['1', '2', '3', '4', '5', '6', '7', '8'];

  constructor() { }

  ngOnInit() {
  }

}
