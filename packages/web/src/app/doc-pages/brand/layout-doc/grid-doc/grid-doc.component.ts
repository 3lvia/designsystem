import { Component, Input, OnInit } from '@angular/core';
import { LOCALE_CODE } from 'contentful/types';

@Component({
  selector: 'app-grid-doc',
  templateUrl: './grid-doc.component.html',
  styleUrls: ['./grid-doc.component.scss'],
})
export class GridDocComponent {
  @Input({ required: true }) locale: LOCALE_CODE;

  egSelectedValue = 0;
  igSelectedValue = 0;
}
