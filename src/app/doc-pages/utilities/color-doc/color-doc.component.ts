import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-doc',
  templateUrl: './color-doc.component.html',
  styleUrls: ['./color-doc.component.scss']
})
export class ColorDocComponent implements OnInit {

  componentClasses = ['e-text', 'e-bg'];
  colors: string[] = ['red', 'green'];

  constructor() { }

  ngOnInit() {
  }


}
