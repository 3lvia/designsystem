import { Component, OnInit } from '@angular/core';
import { typographyItems } from './../typography';

@Component({
  selector: 'app-typography-mobile',
  templateUrl: './typography-mobile.component.html',
  styleUrls: ['./typography-mobile.component.scss']
})
export class TypographyMobileComponent implements OnInit {

  typographyItems = typographyItems;

  constructor() { }

  ngOnInit() {
  }

}
